import { Construct } from "constructs";
import { App, TerraformStack, S3Backend } from "cdktf";
import * as aws from '@cdktf/provider-aws';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new aws.AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    new S3Backend(this, {
      bucket: process.env.BACKEND_BUCKET!,
      key: "sbox_cdktf.terraform.tfstate",
      region: "ap-northeast-1",
    });

    new aws.vpc.Vpc(this, 'vpc', {
      cidrBlock: '10.0.0.0/16',
    });
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
