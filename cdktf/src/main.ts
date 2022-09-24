import { Construct } from "constructs";
import { App, TerraformOutput, TerraformVariable, TerraformStack, Fn } from "cdktf";
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

    const snPublicIds = new TerraformVariable(this, "sn_public_ids", { type: "list(string)" })

    const { vpc } = createVpc(this)
    createSubnets(this, vpc.id)
    createRoutes(this, vpc.id, [
      // FIXME: これ正しい方法がわからない
      Fn.element(snPublicIds.listValue, 0),
      Fn.element(snPublicIds.listValue, 1)
    ])

    new TerraformOutput(this, "vpc_id", { value: vpc.id })
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
