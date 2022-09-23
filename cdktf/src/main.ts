import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import * as aws from '@cdktf/provider-aws';

import { createVpc } from './vpc'
import { createSubnets } from "./subnets";
import { createRoutes } from "./routes";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new aws.AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    const { vpc } = createVpc(this)
    const { publicSubnets } = createSubnets(this, vpc.id)
    createRoutes(this, vpc.id, publicSubnets.map(s => s.id))
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
