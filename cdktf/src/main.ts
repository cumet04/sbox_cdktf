import { Construct } from "constructs";
import { App, TerraformStack, S3Backend, TerraformVariable } from "cdktf";
import * as aws from '@cdktf/provider-aws';

import { createVpc } from './vpc'
import { createSubnets } from "./subnets";
import { createRoutes } from "./routes";
import { createIam } from "./iam";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new aws.AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
      defaultTags: {
        tags: {
          project: "sbox_cdktf"
        }
      }
    });

    const backendAttrs = {
      bucket: process.env.BACKEND_BUCKET!,
      key: "sbox_cdktf.terraform.tfstate",
      region: "ap-northeast-1",
    }
    new S3Backend(this, backendAttrs)
    const backendArn = `arn:aws:s3:::${backendAttrs.bucket}/${backendAttrs.key}`

    const awsAccountId = new TerraformVariable(this, "awsAccountId", { type: "string" }).stringValue
    createIam(this, awsAccountId, backendArn)

    const { vpc } = createVpc(this)
    const { publicSubnets } = createSubnets(this, vpc.id)
    createRoutes(this, vpc.id, publicSubnets.map(s => s.id))
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
