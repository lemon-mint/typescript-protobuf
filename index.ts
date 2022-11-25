export enum WireType {
  VARINT = 0,
  I64 = 1,
  LEN = 2,
  SGROUP = 3, // deprecated
  EGROUP = 4, // deprecated
  I32 = 5,
}

export function ZigZagEncode(value: number): number;
export function ZigZagEncode(value: bigint): bigint;
export function ZigZagEncode(value: number | bigint): any {
  if (typeof value === "bigint") {
    if (value < 0n) {
      value = -value;
      return (value * 2n) - 1n;
    }
    return value * 2n
  }

  if (value < 0) {
    value = -value;
    return (value * 2) - 1;
  }
  return value * 2
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

function DecodeVarNumber(
  buf: Uint8Array,
  offset: number
): [value: number, offset: number] {
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

function DecodeVarBigInt(
  buf: Uint8Array,
  offset: number
): [value: bigint, offset: number] {
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

export function DecodeVarInt32(
  buf: Uint8Array,
  offset: number
): [value: number, offset: number] {
  const [v, o] = DecodeVarNumber(buf, offset);
  return [v, o];
}

export function DecodeVarUint32(
  buf: Uint8Array,
  offset: number
): [value: number, offset: number] {
  const [v, o] = DecodeVarNumber(buf, offset);
  return [v >>> 0, o];
}

export function DecodeVarInt64(
  buf: Uint8Array,
  offset: number
): [value: bigint, offset: number] {
  const [v, o] = DecodeVarBigInt(buf, offset);
  return [v, o];
}

export function DecodeVarUint64(
  buf: Uint8Array,
  offset: number
): [value: bigint, offset: number] {
  const [v, o] = DecodeVarBigInt(buf, offset);
  return [BigInt.asUintN(64, v), o];
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

export function EncodeVarInt(
  dst: Uint8Array,
  offset: number,
  value: number
): number;

export function EncodeVarInt(
  dst: Uint8Array,
  offset: number,
  value: bigint
): number;

export function EncodeVarInt(
  dst: Uint8Array,
  offset: number,
  value: number | bigint
): number {
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
  value: Uint8Array
): number {
  offset = EncodeVarNumber(dst, offset, value.length);
  dst.set(value, offset);
  offset += value.length;
  return offset;
}

const TE = new TextEncoder();

export function EncodeString(
  dst: Uint8Array,
  offset: number,
  value: string
): number {
  return EncodeBytes(dst, offset, TE.encode(value));
}

export function EncodeI32(
  dst: Uint8Array,
  offset: number,
  value: number
): number {
  value = (value | 0) >>> 0;

  dst[offset] = value & 0xff;
  dst[offset + 1] = (value >>> 8) & 0xff;
  dst[offset + 2] = (value >>> 16) & 0xff;
  dst[offset + 3] = (value >>> 24) & 0xff;
  offset += 4;

  return offset;
}

export function EncodeI64(
  dst: Uint8Array,
  offset: number,
  value: bigint
): number {
  value = BigInt.asUintN(64, value);

  dst[offset] = Number(value & 0xffn);
  dst[offset + 1] = Number((value >> 8n) & 0xffn);
  dst[offset + 2] = Number((value >> 16n) & 0xffn);
  dst[offset + 3] = Number((value >> 24n) & 0xffn);
  dst[offset + 4] = Number((value >> 32n) & 0xffn);
  dst[offset + 5] = Number((value >> 40n) & 0xffn);
  dst[offset + 6] = Number((value >> 48n) & 0xffn);
  dst[offset + 7] = Number((value >> 46n) & 0xffn);
  offset += 8;

  return offset;
}

function DebugHex(buf: Uint8Array): string {
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
