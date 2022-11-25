// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.0
// 	protoc        (unknown)
// source: proto/test.proto

package proto

import (
	testpb "github.com/lemon-mint/typescript-protobuf/proto/testpb"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type TestEnum int32

const (
	TestEnum_HTTP  TestEnum = 0
	TestEnum_HTTPS TestEnum = 2
	TestEnum_FTP   TestEnum = 5
)

// Enum value maps for TestEnum.
var (
	TestEnum_name = map[int32]string{
		0: "HTTP",
		2: "HTTPS",
		5: "FTP",
	}
	TestEnum_value = map[string]int32{
		"HTTP":  0,
		"HTTPS": 2,
		"FTP":   5,
	}
)

func (x TestEnum) Enum() *TestEnum {
	p := new(TestEnum)
	*p = x
	return p
}

func (x TestEnum) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (TestEnum) Descriptor() protoreflect.EnumDescriptor {
	return file_proto_test_proto_enumTypes[0].Descriptor()
}

func (TestEnum) Type() protoreflect.EnumType {
	return &file_proto_test_proto_enumTypes[0]
}

func (x TestEnum) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use TestEnum.Descriptor instead.
func (TestEnum) EnumDescriptor() ([]byte, []int) {
	return file_proto_test_proto_rawDescGZIP(), []int{0}
}

type TestStruct struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Protocol  TestEnum               `protobuf:"varint,1,opt,name=protocol,proto3,enum=proto.TestEnum" json:"protocol,omitempty"`
	Host      string                 `protobuf:"bytes,2,opt,name=host,proto3" json:"host,omitempty"`
	Port      uint32                 `protobuf:"varint,3,opt,name=port,proto3" json:"port,omitempty"`
	IsSecure  *bool                  `protobuf:"varint,4,opt,name=is_secure,json=isSecure,proto3,oneof" json:"is_secure,omitempty"`
	CreatedAt *timestamppb.Timestamp `protobuf:"bytes,5,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	Hello     *testpb.HelloRequest   `protobuf:"bytes,60,opt,name=hello,proto3" json:"hello,omitempty"`
	// Types that are assignable to TestOneof:
	//	*TestStruct_Password
	//	*TestStruct_Token
	TestOneof isTestStruct_TestOneof `protobuf_oneof:"TestOneof"`
}

func (x *TestStruct) Reset() {
	*x = TestStruct{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_test_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TestStruct) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TestStruct) ProtoMessage() {}

func (x *TestStruct) ProtoReflect() protoreflect.Message {
	mi := &file_proto_test_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TestStruct.ProtoReflect.Descriptor instead.
func (*TestStruct) Descriptor() ([]byte, []int) {
	return file_proto_test_proto_rawDescGZIP(), []int{0}
}

func (x *TestStruct) GetProtocol() TestEnum {
	if x != nil {
		return x.Protocol
	}
	return TestEnum_HTTP
}

func (x *TestStruct) GetHost() string {
	if x != nil {
		return x.Host
	}
	return ""
}

func (x *TestStruct) GetPort() uint32 {
	if x != nil {
		return x.Port
	}
	return 0
}

func (x *TestStruct) GetIsSecure() bool {
	if x != nil && x.IsSecure != nil {
		return *x.IsSecure
	}
	return false
}

func (x *TestStruct) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

func (x *TestStruct) GetHello() *testpb.HelloRequest {
	if x != nil {
		return x.Hello
	}
	return nil
}

func (m *TestStruct) GetTestOneof() isTestStruct_TestOneof {
	if m != nil {
		return m.TestOneof
	}
	return nil
}

func (x *TestStruct) GetPassword() string {
	if x, ok := x.GetTestOneof().(*TestStruct_Password); ok {
		return x.Password
	}
	return ""
}

func (x *TestStruct) GetToken() uint64 {
	if x, ok := x.GetTestOneof().(*TestStruct_Token); ok {
		return x.Token
	}
	return 0
}

type isTestStruct_TestOneof interface {
	isTestStruct_TestOneof()
}

type TestStruct_Password struct {
	Password string `protobuf:"bytes,6,opt,name=password,proto3,oneof"`
}

type TestStruct_Token struct {
	Token uint64 `protobuf:"varint,7,opt,name=token,proto3,oneof"`
}

func (*TestStruct_Password) isTestStruct_TestOneof() {}

func (*TestStruct_Token) isTestStruct_TestOneof() {}

type TestWire struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Ids []uint32 `protobuf:"varint,1,rep,packed,name=ids,proto3" json:"ids,omitempty"`
}

func (x *TestWire) Reset() {
	*x = TestWire{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_test_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TestWire) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TestWire) ProtoMessage() {}

func (x *TestWire) ProtoReflect() protoreflect.Message {
	mi := &file_proto_test_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TestWire.ProtoReflect.Descriptor instead.
func (*TestWire) Descriptor() ([]byte, []int) {
	return file_proto_test_proto_rawDescGZIP(), []int{1}
}

func (x *TestWire) GetIds() []uint32 {
	if x != nil {
		return x.Ids
	}
	return nil
}

type Box3D struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Scale    *Point3D `protobuf:"bytes,1,opt,name=scale,proto3" json:"scale,omitempty"`
	Position *Point3D `protobuf:"bytes,2,opt,name=position,proto3" json:"position,omitempty"`
	Rotate   *Point3D `protobuf:"bytes,3,opt,name=rotate,proto3" json:"rotate,omitempty"`
	Pivot    *Point3D `protobuf:"bytes,4,opt,name=pivot,proto3" json:"pivot,omitempty"`
}

func (x *Box3D) Reset() {
	*x = Box3D{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_test_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Box3D) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Box3D) ProtoMessage() {}

func (x *Box3D) ProtoReflect() protoreflect.Message {
	mi := &file_proto_test_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Box3D.ProtoReflect.Descriptor instead.
func (*Box3D) Descriptor() ([]byte, []int) {
	return file_proto_test_proto_rawDescGZIP(), []int{2}
}

func (x *Box3D) GetScale() *Point3D {
	if x != nil {
		return x.Scale
	}
	return nil
}

func (x *Box3D) GetPosition() *Point3D {
	if x != nil {
		return x.Position
	}
	return nil
}

func (x *Box3D) GetRotate() *Point3D {
	if x != nil {
		return x.Rotate
	}
	return nil
}

func (x *Box3D) GetPivot() *Point3D {
	if x != nil {
		return x.Pivot
	}
	return nil
}

type Point3D struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	X int32 `protobuf:"varint,1,opt,name=x,proto3" json:"x,omitempty"`
	Y int32 `protobuf:"varint,2,opt,name=y,proto3" json:"y,omitempty"`
	Z int32 `protobuf:"varint,3,opt,name=z,proto3" json:"z,omitempty"`
}

func (x *Point3D) Reset() {
	*x = Point3D{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_test_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Point3D) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Point3D) ProtoMessage() {}

func (x *Point3D) ProtoReflect() protoreflect.Message {
	mi := &file_proto_test_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Point3D.ProtoReflect.Descriptor instead.
func (*Point3D) Descriptor() ([]byte, []int) {
	return file_proto_test_proto_rawDescGZIP(), []int{3}
}

func (x *Point3D) GetX() int32 {
	if x != nil {
		return x.X
	}
	return 0
}

func (x *Point3D) GetY() int32 {
	if x != nil {
		return x.Y
	}
	return 0
}

func (x *Point3D) GetZ() int32 {
	if x != nil {
		return x.Z
	}
	return 0
}

var File_proto_test_proto protoreflect.FileDescriptor

var file_proto_test_proto_rawDesc = []byte{
	0x0a, 0x10, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x74, 0x65, 0x73, 0x74, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x05, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73,
	0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x19, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2f, 0x74, 0x65, 0x73, 0x74, 0x70, 0x62, 0x2f, 0x74, 0x65, 0x73, 0x74, 0x70, 0x62, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xbb, 0x02, 0x0a, 0x0a, 0x54, 0x65, 0x73, 0x74, 0x53, 0x74,
	0x72, 0x75, 0x63, 0x74, 0x12, 0x2b, 0x0a, 0x08, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x0f, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x54,
	0x65, 0x73, 0x74, 0x45, 0x6e, 0x75, 0x6d, 0x52, 0x08, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f,
	0x6c, 0x12, 0x12, 0x0a, 0x04, 0x68, 0x6f, 0x73, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x04, 0x68, 0x6f, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x70, 0x6f, 0x72, 0x74, 0x18, 0x03, 0x20,
	0x01, 0x28, 0x0d, 0x52, 0x04, 0x70, 0x6f, 0x72, 0x74, 0x12, 0x20, 0x0a, 0x09, 0x69, 0x73, 0x5f,
	0x73, 0x65, 0x63, 0x75, 0x72, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x08, 0x48, 0x01, 0x52, 0x08,
	0x69, 0x73, 0x53, 0x65, 0x63, 0x75, 0x72, 0x65, 0x88, 0x01, 0x01, 0x12, 0x39, 0x0a, 0x0a, 0x63,
	0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x63, 0x72, 0x65,
	0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x2a, 0x0a, 0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x18,
	0x3c, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14, 0x2e, 0x74, 0x65, 0x73, 0x74, 0x70, 0x62, 0x2e, 0x48,
	0x65, 0x6c, 0x6c, 0x6f, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x52, 0x05, 0x68, 0x65, 0x6c,
	0x6c, 0x6f, 0x12, 0x1c, 0x0a, 0x08, 0x70, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64, 0x18, 0x06,
	0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x08, 0x70, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64,
	0x12, 0x16, 0x0a, 0x05, 0x74, 0x6f, 0x6b, 0x65, 0x6e, 0x18, 0x07, 0x20, 0x01, 0x28, 0x04, 0x48,
	0x00, 0x52, 0x05, 0x74, 0x6f, 0x6b, 0x65, 0x6e, 0x42, 0x0b, 0x0a, 0x09, 0x54, 0x65, 0x73, 0x74,
	0x4f, 0x6e, 0x65, 0x6f, 0x66, 0x42, 0x0c, 0x0a, 0x0a, 0x5f, 0x69, 0x73, 0x5f, 0x73, 0x65, 0x63,
	0x75, 0x72, 0x65, 0x22, 0x1c, 0x0a, 0x08, 0x54, 0x65, 0x73, 0x74, 0x57, 0x69, 0x72, 0x65, 0x12,
	0x10, 0x0a, 0x03, 0x69, 0x64, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0d, 0x52, 0x03, 0x69, 0x64,
	0x73, 0x22, 0xa7, 0x01, 0x0a, 0x05, 0x42, 0x6f, 0x78, 0x33, 0x44, 0x12, 0x24, 0x0a, 0x05, 0x73,
	0x63, 0x61, 0x6c, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x2e, 0x50, 0x6f, 0x69, 0x6e, 0x74, 0x33, 0x44, 0x52, 0x05, 0x73, 0x63, 0x61, 0x6c,
	0x65, 0x12, 0x2a, 0x0a, 0x08, 0x70, 0x6f, 0x73, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x50, 0x6f, 0x69, 0x6e,
	0x74, 0x33, 0x44, 0x52, 0x08, 0x70, 0x6f, 0x73, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x26, 0x0a,
	0x06, 0x72, 0x6f, 0x74, 0x61, 0x74, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x50, 0x6f, 0x69, 0x6e, 0x74, 0x33, 0x44, 0x52, 0x06, 0x72,
	0x6f, 0x74, 0x61, 0x74, 0x65, 0x12, 0x24, 0x0a, 0x05, 0x70, 0x69, 0x76, 0x6f, 0x74, 0x18, 0x04,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x50, 0x6f, 0x69,
	0x6e, 0x74, 0x33, 0x44, 0x52, 0x05, 0x70, 0x69, 0x76, 0x6f, 0x74, 0x22, 0x33, 0x0a, 0x07, 0x50,
	0x6f, 0x69, 0x6e, 0x74, 0x33, 0x44, 0x12, 0x0c, 0x0a, 0x01, 0x78, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x05, 0x52, 0x01, 0x78, 0x12, 0x0c, 0x0a, 0x01, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52,
	0x01, 0x79, 0x12, 0x0c, 0x0a, 0x01, 0x7a, 0x18, 0x03, 0x20, 0x01, 0x28, 0x05, 0x52, 0x01, 0x7a,
	0x2a, 0x28, 0x0a, 0x08, 0x54, 0x65, 0x73, 0x74, 0x45, 0x6e, 0x75, 0x6d, 0x12, 0x08, 0x0a, 0x04,
	0x48, 0x54, 0x54, 0x50, 0x10, 0x00, 0x12, 0x09, 0x0a, 0x05, 0x48, 0x54, 0x54, 0x50, 0x53, 0x10,
	0x02, 0x12, 0x07, 0x0a, 0x03, 0x46, 0x54, 0x50, 0x10, 0x05, 0x42, 0x31, 0x5a, 0x2f, 0x67, 0x69,
	0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6c, 0x65, 0x6d, 0x6f, 0x6e, 0x2d, 0x6d,
	0x69, 0x6e, 0x74, 0x2f, 0x74, 0x79, 0x70, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x2d, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_test_proto_rawDescOnce sync.Once
	file_proto_test_proto_rawDescData = file_proto_test_proto_rawDesc
)

func file_proto_test_proto_rawDescGZIP() []byte {
	file_proto_test_proto_rawDescOnce.Do(func() {
		file_proto_test_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_test_proto_rawDescData)
	})
	return file_proto_test_proto_rawDescData
}

var file_proto_test_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_proto_test_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_proto_test_proto_goTypes = []interface{}{
	(TestEnum)(0),                 // 0: proto.TestEnum
	(*TestStruct)(nil),            // 1: proto.TestStruct
	(*TestWire)(nil),              // 2: proto.TestWire
	(*Box3D)(nil),                 // 3: proto.Box3D
	(*Point3D)(nil),               // 4: proto.Point3D
	(*timestamppb.Timestamp)(nil), // 5: google.protobuf.Timestamp
	(*testpb.HelloRequest)(nil),   // 6: testpb.HelloRequest
}
var file_proto_test_proto_depIdxs = []int32{
	0, // 0: proto.TestStruct.protocol:type_name -> proto.TestEnum
	5, // 1: proto.TestStruct.created_at:type_name -> google.protobuf.Timestamp
	6, // 2: proto.TestStruct.hello:type_name -> testpb.HelloRequest
	4, // 3: proto.Box3D.scale:type_name -> proto.Point3D
	4, // 4: proto.Box3D.position:type_name -> proto.Point3D
	4, // 5: proto.Box3D.rotate:type_name -> proto.Point3D
	4, // 6: proto.Box3D.pivot:type_name -> proto.Point3D
	7, // [7:7] is the sub-list for method output_type
	7, // [7:7] is the sub-list for method input_type
	7, // [7:7] is the sub-list for extension type_name
	7, // [7:7] is the sub-list for extension extendee
	0, // [0:7] is the sub-list for field type_name
}

func init() { file_proto_test_proto_init() }
func file_proto_test_proto_init() {
	if File_proto_test_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_test_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TestStruct); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_test_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TestWire); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_test_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Box3D); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_test_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Point3D); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_proto_test_proto_msgTypes[0].OneofWrappers = []interface{}{
		(*TestStruct_Password)(nil),
		(*TestStruct_Token)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_test_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_proto_test_proto_goTypes,
		DependencyIndexes: file_proto_test_proto_depIdxs,
		EnumInfos:         file_proto_test_proto_enumTypes,
		MessageInfos:      file_proto_test_proto_msgTypes,
	}.Build()
	File_proto_test_proto = out.File
	file_proto_test_proto_rawDesc = nil
	file_proto_test_proto_goTypes = nil
	file_proto_test_proto_depIdxs = nil
}
