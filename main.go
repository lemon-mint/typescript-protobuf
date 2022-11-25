package main

import (
	"os"

	"github.com/lemon-mint/typescript-protobuf/proto"
)

/*
const testObject: ObjectSimple = {
    scale: {
        x: -123,
        y: -456,
        z: -789,
    },
    position: {
        x: 123,
        y: 456,
        z: 789,
    },
    rotate: {
        x: 0,
        y: 1,
        z: 2,
    },
    pivot: {
        x: -100,
        y: -200,
        z: -300,
    },
};
*/

func main() {
	testobj := proto.Box3D{
		Scale: &proto.Point3D{
			X: -123,
			Y: -456,
			Z: -789,
		},
		Position: &proto.Point3D{
			X: 123,
			Y: 456,
			Z: 789,
		},
		Rotate: &proto.Point3D{
			X: 0,
			Y: 1,
			Z: 2,
		},
		Pivot: &proto.Point3D{
			X: -100,
			Y: -200,
			Z: -300,
		},
	}

	b, _ := testobj.MarshalVT()
	os.Stdout.Write(b)
}
