import { Construct } from "constructs";
import * as aws from '@cdktf/provider-aws';

export function createVpc(scope: Construct): { vpc: { id: string } } {
  const vpc = new aws.vpc.Vpc(scope, 'vpc', {
    cidrBlock: '10.0.0.0/16',
  });

  return { vpc }
}
