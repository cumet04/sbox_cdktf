import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import * as aws from '@cdktf/provider-aws';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new aws.AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
