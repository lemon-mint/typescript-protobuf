export declare enum WireType {
    VARINT = 0,
    I64 = 1,
    LEN = 2,
    SGROUP = 3,
    EGROUP = 4,
    I32 = 5
}
export declare function DecodeVarInt32(buf: Uint8Array, offset: number): [value: number, offset: number];
export declare function DecodeVarUint32(buf: Uint8Array, offset: number): [value: number, offset: number];
export declare function DecodeVarInt64(buf: Uint8Array, offset: number): [value: bigint, offset: number];
export declare function DecodeVarUint64(buf: Uint8Array, offset: number): [value: bigint, offset: number];
export declare function EncodeValueHeader(dst: Uint8Array, offset: number, fieldNumber: number, wireType: WireType): number;
export declare function EncodeVarInt(dst: Uint8Array, offset: number, fieldNumber: number, value: number): number;
export declare function EncodeVarInt(dst: Uint8Array, offset: number, fieldNumber: number, value: bigint): number;
export declare function EncodeBytes(dst: Uint8Array, offset: number, fieldNumber: number, value: Uint8Array): number;
export declare function EncodeString(dst: Uint8Array, offset: number, fieldNumber: number, value: string): number;
//# sourceMappingURL=index.d.ts.map