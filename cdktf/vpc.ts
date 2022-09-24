/*Provider bindings are generated by running cdktf get.
See https://cdk.tf/provider-generation for more details.*/
import * as aws from "./.gen/providers/aws";

/*The following providers are missing schema information and might need manual adjustments to synthesize correctly: aws.
For a more precise conversion please use the --provider flag in convert.*/
new aws.vpc.Vpc(this, "vpc", {
  cidr_block: "10.0.0.0/16",
});

