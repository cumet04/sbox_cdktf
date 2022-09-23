import { Construct } from "constructs";
import { App, S3Backend, TerraformStack } from "cdktf";
import * as aws from '@cdktf/provider-aws';

import { Hcl } from '../.gen/modules/hcl';

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

    new Hcl(this, 'hcl', {});
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
