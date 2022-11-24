enum WireType {
  VARINT = 0,
  I64 = 1,
  LEN = 2,
  SGROUP = 3, // deprecated
  EGROUP = 4, // deprecated
  I32 = 5,
}

function EncodeVarint(dst: Uint8Array, offset: number, value: number): number {
  value = (value | 0) >>> 0; // 32-bit integer

  while (value > 127) {
    dst[offset++] = (value & 0b01111111) | 0b10000000;
    value >>>= 7;
  }
  dst[offset++] = value;

  return offset;
}

function EncodeVarintBigint(
  dst: Uint8Array,
  offset: number,
  value: bigint
): number {
  value = BigInt.asUintN(64, value);

  while (value > 127n) {
    dst[offset++] = Number(value & 0b01111111n) | 0b10000000;
    value >>= 7n;
  }
  dst[offset++] = Number(value);

  return offset;
}

function EncodeValueHeader(
  dst: Uint8Array,
  offset: number,
  fieldNumber: number,
  wireType: WireType
): number {
  const tag = (fieldNumber << 3) | Number(wireType);
  return EncodeVarint(dst, offset, tag);
}

function DebugHex(buf: Uint8Array): string {
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
