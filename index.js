"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeI64 = exports.EncodeI64 = exports.DecodeI32 = exports.EncodeI32 = exports.EncodeString = exports.EncodeBytes = exports.EncodeVarInt = exports.EncodeValueHeader = exports.DecodeVarUint64 = exports.DecodeVarInt64 = exports.DecodeVarUint32 = exports.DecodeVarInt32 = exports.ZigZagDecode = exports.ZigZagEncode = exports.WireType = void 0;
var WireType;
(function (WireType) {
    WireType[WireType["VARINT"] = 0] = "VARINT";
    WireType[WireType["I64"] = 1] = "I64";
    WireType[WireType["LEN"] = 2] = "LEN";
    WireType[WireType["SGROUP"] = 3] = "SGROUP";
    WireType[WireType["EGROUP"] = 4] = "EGROUP";
    WireType[WireType["I32"] = 5] = "I32";
})(WireType = exports.WireType || (exports.WireType = {}));
function ZigZagEncode(value) {
    if (typeof value === "bigint") {
        if (value < 0n) {
            value = -value;
            return value * 2n - 1n;
        }
        return value * 2n;
    }
    if (value < 0) {
        value = -value;
        return value * 2 - 1;
    }
    return value * 2;
}
exports.ZigZagEncode = ZigZagEncode;
function ZigZagDecode(value) {
    if (typeof value === "bigint") {
        value = BigInt.asUintN(64, value);
        if (value & 1n) {
            return -(value + 1n) / 2n;
        }
        return value / 2n;
    }
    value = value >>> 0;
    if (value & 1) {
        return -(value + 1) / 2;
    }
    return value / 2;
}
exports.ZigZagDecode = ZigZagDecode;
function EncodeVarNumber(dst, offset, value) {
    value = (value | 0) >>> 0; // 32-bit integer
    while (value > 127) {
        dst[offset++] = (value & 0b01111111) | 0b10000000;
        value >>>= 7;
    }
    dst[offset++] = value;
    return offset;
}
function DecodeVarNumber(buf, offset) {
    let value = 0;
    let shift = 0;
    while (true) {
        const byte = buf[offset++];
        value |= (byte & 0b01111111) << shift;
        if (byte < 128) {
            break;
        }
        shift += 7;
    }
    return [value | 0, offset];
}
function DecodeVarBigInt(buf, offset) {
    let value = 0n;
    let shift = 0n;
    while (true) {
        const byte = buf[offset++];
        value |= BigInt(byte & 0b01111111) << shift;
        if (byte < 128) {
            break;
        }
        shift += 7n;
    }
    return [BigInt.asIntN(64, value), offset];
}
function DecodeVarInt32(buf, offset) {
    const [v, o] = DecodeVarNumber(buf, offset);
    return [v, o];
}
exports.DecodeVarInt32 = DecodeVarInt32;
function DecodeVarUint32(buf, offset) {
    const [v, o] = DecodeVarNumber(buf, offset);
    return [v >>> 0, o];
}
exports.DecodeVarUint32 = DecodeVarUint32;
function DecodeVarInt64(buf, offset) {
    const [v, o] = DecodeVarBigInt(buf, offset);
    return [v, o];
}
exports.DecodeVarInt64 = DecodeVarInt64;
function DecodeVarUint64(buf, offset) {
    const [v, o] = DecodeVarBigInt(buf, offset);
    return [BigInt.asUintN(64, v), o];
}
exports.DecodeVarUint64 = DecodeVarUint64;
function EncodeVarBigInt(dst, offset, value) {
    value = BigInt.asUintN(64, value);
    while (value > 127n) {
        dst[offset++] = Number(value & 127n) | 0b10000000;
        value >>= 7n;
    }
    dst[offset++] = Number(value);
    return offset;
}
function EncodeValueHeader(dst, offset, fieldNumber, wireType) {
    const tag = (fieldNumber << 3) | Number(wireType);
    return EncodeVarNumber(dst, offset, tag);
}
exports.EncodeValueHeader = EncodeValueHeader;
function EncodeVarInt(dst, offset, value) {
    if (typeof value === "bigint") {
        offset = EncodeVarBigInt(dst, offset, value);
    }
    else {
        offset = EncodeVarNumber(dst, offset, value);
    }
    return offset;
}
exports.EncodeVarInt = EncodeVarInt;
function EncodeBytes(dst, offset, value) {
    offset = EncodeVarNumber(dst, offset, value.length);
    dst.set(value, offset);
    offset += value.length;
    return offset;
}
exports.EncodeBytes = EncodeBytes;
const TE = new TextEncoder();
function EncodeString(dst, offset, value) {
    return EncodeBytes(dst, offset, TE.encode(value));
}
exports.EncodeString = EncodeString;
function EncodeI32(dst, offset, value) {
    value = (value | 0) >>> 0;
    dst[offset] = value & 0xff;
    dst[offset + 1] = (value >>> 8) & 0xff;
    dst[offset + 2] = (value >>> 16) & 0xff;
    dst[offset + 3] = (value >>> 24) & 0xff;
    offset += 4;
    return offset;
}
exports.EncodeI32 = EncodeI32;
function DecodeI32(buf, offset) {
    const value = (buf[offset] << 0) |
        (buf[offset + 1] << 8) |
        (buf[offset + 2] << 16) |
        (buf[offset + 3] << 24);
    offset += 4;
    return [value, offset];
}
exports.DecodeI32 = DecodeI32;
function EncodeI64(dst, offset, value) {
    value = BigInt.asUintN(64, value);
    dst[offset] = Number(value & 0xffn);
    dst[offset + 1] = Number((value >> 8n) & 0xffn);
    dst[offset + 2] = Number((value >> 16n) & 0xffn);
    dst[offset + 3] = Number((value >> 24n) & 0xffn);
    dst[offset + 4] = Number((value >> 32n) & 0xffn);
    dst[offset + 5] = Number((value >> 40n) & 0xffn);
    dst[offset + 6] = Number((value >> 48n) & 0xffn);
    dst[offset + 7] = Number((value >> 56n) & 0xffn);
    offset += 8;
    return offset;
}
exports.EncodeI64 = EncodeI64;
function DecodeI64(buf, offset) {
    const value = (BigInt(buf[offset]) << 0n) |
        (BigInt(buf[offset + 1]) << 8n) |
        (BigInt(buf[offset + 2]) << 16n) |
        (BigInt(buf[offset + 3]) << 24n) |
        (BigInt(buf[offset + 4]) << 32n) |
        (BigInt(buf[offset + 5]) << 40n) |
        (BigInt(buf[offset + 6]) << 48n) |
        (BigInt(buf[offset + 7]) << 56n);
    offset += 8;
    return [BigInt.asIntN(64, value), offset];
}
exports.DecodeI64 = DecodeI64;
function DebugHex(buf) {
    return Array.from(buf)
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}
// Test Enocde Message
const buf = new Uint8Array(1024);
let offset = 0;
offset = EncodeValueHeader(buf, offset, 1, WireType.VARINT);
offset = EncodeVarInt(buf, offset, 123);
offset = EncodeValueHeader(buf, offset, 2, WireType.VARINT);
offset = EncodeVarInt(buf, offset, 456n);
offset = EncodeValueHeader(buf, offset, 3, WireType.LEN);
offset = EncodeString(buf, offset, "Hello World");
// submessage
const submessage = new Uint8Array(1024);
let suboffset = 0;
suboffset = EncodeValueHeader(submessage, suboffset, 1, WireType.VARINT);
suboffset = EncodeVarInt(submessage, suboffset, 789);
suboffset = EncodeValueHeader(submessage, suboffset, 2, WireType.VARINT);
suboffset = EncodeVarInt(submessage, suboffset, 101112n);
suboffset = EncodeValueHeader(submessage, suboffset, 3, WireType.LEN);
suboffset = EncodeString(submessage, suboffset, "Hello New World");
offset = EncodeValueHeader(buf, offset, 4, WireType.LEN);
offset = EncodeBytes(buf, offset, submessage.subarray(0, suboffset));
// repeated
for (let index = 0; index < 4; index++) {
    offset = EncodeValueHeader(buf, offset, 5, WireType.VARINT);
    offset = EncodeVarInt(buf, offset, (index + 1) * 1000);
}
// Maps
for (let index = 0; index < 2; index++) {
    const gEntry = new Uint8Array(512);
    let gOffset = 0;
    //key_<index>
    gOffset = EncodeValueHeader(gEntry, gOffset, 1, WireType.LEN);
    gOffset = EncodeString(gEntry, gOffset, `key_${index}`);
    //val_<index>
    gOffset = EncodeValueHeader(gEntry, gOffset, 2, WireType.LEN);
    gOffset = EncodeString(gEntry, gOffset, `val_${index}`);
    offset = EncodeValueHeader(buf, offset, 6, WireType.LEN);
    offset = EncodeBytes(buf, offset, gEntry.subarray(0, gOffset));
}
// packed
offset = EncodeValueHeader(buf, offset, 7, WireType.LEN);
const packed = new Uint8Array(1024);
let packedoffset = 0;
packedoffset = EncodeVarInt(packed, packedoffset, 3);
packedoffset = EncodeVarInt(packed, packedoffset, 270);
packedoffset = EncodeVarInt(packed, packedoffset, 86942);
offset = EncodeBytes(buf, offset, packed.subarray(0, packedoffset));
// I32, I64
offset = EncodeValueHeader(buf, offset, 8, WireType.I32);
offset = EncodeI32(buf, offset, 888);
offset = EncodeValueHeader(buf, offset, 9, WireType.I64);
offset = EncodeI64(buf, offset, 999n);
console.log(DebugHex(buf.subarray(0, offset)));
// for (let i = -100000; i < 100000; i++) {
//   offset = 0;
//   offset = EncodeI64(buf, offset, BigInt(i));
//   const [value, _] = DecodeI64(buf, 0);
//   if (value !== BigInt(i)) {
//     throw new Error(`i64 encode/decode failed: ${i} != ${value}`);
//   }
// }
//# sourceMappingURL=index.js.map