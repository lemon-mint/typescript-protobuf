"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodeString = exports.EncodeBytes = exports.EncodeVarInt = exports.EncodeValueHeader = exports.DecodeVarUint64 = exports.DecodeVarInt64 = exports.DecodeVarUint32 = exports.DecodeVarInt32 = exports.WireType = void 0;
var WireType;
(function (WireType) {
    WireType[WireType["VARINT"] = 0] = "VARINT";
    WireType[WireType["I64"] = 1] = "I64";
    WireType[WireType["LEN"] = 2] = "LEN";
    WireType[WireType["SGROUP"] = 3] = "SGROUP";
    WireType[WireType["EGROUP"] = 4] = "EGROUP";
    WireType[WireType["I32"] = 5] = "I32";
})(WireType = exports.WireType || (exports.WireType = {}));
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
function EncodeVarInt(dst, offset, fieldNumber, value) {
    offset = EncodeValueHeader(dst, offset, fieldNumber, WireType.VARINT);
    if (typeof value === "bigint") {
        offset = EncodeVarBigInt(dst, offset, value);
    }
    else {
        offset = EncodeVarNumber(dst, offset, value);
    }
    return offset;
}
exports.EncodeVarInt = EncodeVarInt;
function EncodeBytes(dst, offset, fieldNumber, value) {
    offset = EncodeValueHeader(dst, offset, fieldNumber, WireType.LEN);
    offset = EncodeVarNumber(dst, offset, value.length);
    dst.set(value, offset);
    offset += value.length;
    return offset;
}
exports.EncodeBytes = EncodeBytes;
const TE = new TextEncoder();
function EncodeString(dst, offset, fieldNumber, value) {
    return EncodeBytes(dst, offset, fieldNumber, TE.encode(value));
}
exports.EncodeString = EncodeString;
function DebugHex(buf) {
    return Array.from(buf)
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}
// Test Enocde Message
const buf = new Uint8Array(1024);
let offset = 0;
offset = EncodeVarInt(buf, offset, 1, 123);
offset = EncodeVarInt(buf, offset, 2, 456n);
offset = EncodeString(buf, offset, 3, "Hello World");
const submessage = new Uint8Array(1024);
let suboffset = 0;
suboffset = EncodeVarInt(submessage, suboffset, 1, 789);
suboffset = EncodeVarInt(submessage, suboffset, 2, 101112n);
suboffset = EncodeString(submessage, suboffset, 3, "Hello New World");
offset = EncodeBytes(buf, offset, 4, submessage.subarray(0, suboffset));
console.log(DebugHex(buf.subarray(0, offset)));
//# sourceMappingURL=index.js.map