import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { File } from "@cdktf/provider-local/lib/file";
import { LocalProvider } from "@cdktf/provider-local/lib/provider";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new LocalProvider(this, "local", {})

    new File(this, "file1", {
      filename: "file1.txt",
      content: "hello world",
    })

    new File(this, "file2", {
      filename: "file2.txt",
      content: "hello world!!",
    })
  }
}

const app = new App();
new MyStack(app, "moved");
app.synth();
