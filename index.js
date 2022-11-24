"use strict";
var WireType;
(function (WireType) {
    WireType[WireType["VARINT"] = 0] = "VARINT";
    WireType[WireType["I64"] = 1] = "I64";
    WireType[WireType["LEN"] = 2] = "LEN";
    WireType[WireType["SGROUP"] = 3] = "SGROUP";
    WireType[WireType["EGROUP"] = 4] = "EGROUP";
    WireType[WireType["I32"] = 5] = "I32";
})(WireType || (WireType = {}));
function EncodeVarint(dst, offset, value) {
    value = (value | 0) >>> 0; // 32-bit integer
    while (value > 127) {
        dst[offset++] = (value & 0b01111111) | 0b10000000;
        value >>>= 7;
    }
    dst[offset++] = value;
    return offset;
}
function EncodeVarintBigint(dst, offset, value) {
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
    return EncodeVarint(dst, offset, tag);
}
function DebugHex(buf) {
    return Array.from(buf)
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}
// Test Enocde Message
const buf = new Uint8Array(1024);
let offset = 0;
// Encode Message Header
offset = EncodeValueHeader(buf, offset, 1, WireType.VARINT);
offset = EncodeVarint(buf, offset, 123);
console.log(DebugHex(buf.subarray(0, offset)));
//# sourceMappingURL=index.js.map