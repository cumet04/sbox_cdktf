import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import * as aws from '@cdktf/provider-aws';

import { createVpc } from './vpc'

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new aws.AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    const { vpc } = createVpc(this)

    new TerraformOutput(this, "vpc_id", { value: vpc.id })
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
