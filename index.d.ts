declare enum WireType {
    VARINT = 0,
    I64 = 1,
    LEN = 2,
    SGROUP = 3,
    EGROUP = 4,
    I32 = 5
}
declare function EncodeVarint32(dst: Uint8Array, offset: number, value: number): number;
declare function EncodeVarint64(dst: Uint8Array, offset: number, value: bigint): number;
declare function EncodeValueHeader(dst: Uint8Array, offset: number, fieldNumber: number, wireType: WireType): number;
declare function DebugHex(buf: Uint8Array): string;
declare const buf: Uint8Array;
declare let offset: number;
//# sourceMappingURL=index.d.ts.map