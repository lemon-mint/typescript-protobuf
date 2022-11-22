go build \
    -o ./cmd/protoc-gen-lemontypes/protoc-gen-lemontypes.exe \
    -v \
    ./cmd/protoc-gen-lemontypes

buf generate
