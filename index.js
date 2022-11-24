"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodeString = exports.EncodeBytes = exports.EncodeVarint = exports.EncodeValueHeader = exports.WireType = void 0;
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
function EncodeVarint(dst, offset, fieldNumber, value) {
    offset = EncodeValueHeader(dst, offset, fieldNumber, WireType.VARINT);
    if (typeof value === "bigint") {
        offset = EncodeVarBigInt(dst, offset, value);
    }
    else {
        offset = EncodeVarNumber(dst, offset, value);
    }
    return offset;
}
exports.EncodeVarint = EncodeVarint;
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
offset = EncodeVarint(buf, offset, 1, 123);
offset = EncodeVarint(buf, offset, 2, 456n);
offset = EncodeString(buf, offset, 3, "Hello World");
const submessage = new Uint8Array(1024);
let suboffset = 0;
suboffset = EncodeVarint(submessage, suboffset, 1, 789);
suboffset = EncodeVarint(submessage, suboffset, 2, 101112n);
suboffset = EncodeString(submessage, suboffset, 3, "Hello Second World");
offset = EncodeBytes(buf, offset, 4, submessage.subarray(0, suboffset));
console.log(DebugHex(buf.subarray(0, offset)));
//# sourceMappingURL=index.js.map