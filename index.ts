export enum WireType {
  VARINT = 0,
  I64 = 1,
  LEN = 2,
  SGROUP = 3, // deprecated
  EGROUP = 4, // deprecated
  I32 = 5,
}

function EncodeVarNumber(
  dst: Uint8Array,
  offset: number,
  value: number
): number {
  value = (value | 0) >>> 0; // 32-bit integer

  while (value > 127) {
    dst[offset++] = (value & 0b01111111) | 0b10000000;
    value >>>= 7;
  }
  dst[offset++] = value;

  return offset;
}

function EncodeVarBigInt(
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

export function EncodeValueHeader(
  dst: Uint8Array,
  offset: number,
  fieldNumber: number,
  wireType: WireType
): number {
  const tag = (fieldNumber << 3) | Number(wireType);
  return EncodeVarNumber(dst, offset, tag);
}

export function EncodeVarint(
  dst: Uint8Array,
  offset: number,
  fieldNumber: number,
  value: number
): number;

export function EncodeVarint(
  dst: Uint8Array,
  offset: number,
  fieldNumber: number,
  value: bigint
): number;

export function EncodeVarint(
  dst: Uint8Array,
  offset: number,
  fieldNumber: number,
  value: number | bigint
): number {
  offset = EncodeValueHeader(dst, offset, fieldNumber, WireType.VARINT);
  if (typeof value === "bigint") {
    offset = EncodeVarBigInt(dst, offset, value);
  } else {
    offset = EncodeVarNumber(dst, offset, value);
  }
  return offset;
}

export function EncodeBytes(
  dst: Uint8Array,
  offset: number,
  fieldNumber: number,
  value: Uint8Array
): number {
  offset = EncodeValueHeader(dst, offset, fieldNumber, WireType.LEN);
  offset = EncodeVarNumber(dst, offset, value.length);
  dst.set(value, offset);
  offset += value.length;
  return offset;
}

const TE = new TextEncoder();

export function EncodeString(
  dst: Uint8Array,
  offset: number,
  fieldNumber: number,
  value: string
): number {
  return EncodeBytes(dst, offset, fieldNumber, TE.encode(value));
}

function DebugHex(buf: Uint8Array): string {
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
