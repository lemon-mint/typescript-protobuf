package main

import "google.golang.org/protobuf/compiler/protogen"

func main() {
	opt := protogen.Options{}
	opt.Run(generate)
}

func generate(p *protogen.Plugin) error {
	for _, f := range p.Files {
		if !f.Generate {
			continue
		}
		compile(p, f)
	}
	return nil
}

func compile(p *protogen.Plugin, file *protogen.File) {
	name := file.GeneratedFilenamePrefix + "_lemontypes.pb.ts"
	f := p.NewGeneratedFile(name, file.GoImportPath)

	f.P("// Code generated by protoc-gen-lemontypes. DO NOT EDIT.")
	f.P()

}