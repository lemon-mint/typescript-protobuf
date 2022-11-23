enum WireType {
  VARINT = 0,
  I64 = 1,
  LEN = 2,
  SGROUP = 3, // deprecated
  EGROUP = 4, // deprecated
  I32 = 5,
}

function EncodeVarint(dst: Uint8Array, offset: number, value: number): number {
  value = value | 0; // 32-bit integer

  while (value > 0b01111111) {
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
  value = BigInt.asIntN(64, value);

  while (value > 0b01111111n) {
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
