import { Construct } from "constructs";
import * as aws from '@cdktf/provider-aws';

export function createSubnets(scope: Construct, vpcId: string): {
  publicSubnets: {
    id: string
  }[]
} {
  const subnet = (name: string, az: string, cidr: string) =>
    new aws.vpc.Subnet(scope, name, {
      vpcId: vpcId,
      availabilityZone: az,
      cidrBlock: cidr,
    });
  const pub1 = subnet('snPublic1', 'ap-northeast-1a', '10.0.0.0/24');
  const pub2 = subnet('snPublic2', 'ap-northeast-1c', '10.0.1.0/24');
  subnet('snPrivate1', 'ap-northeast-1a', '10.0.2.0/24');
  subnet('snPrivate2', 'ap-northeast-1c', '10.0.3.0/24');

  return {
    publicSubnets: [
      { id: pub1.id },
      { id: pub2.id },
    ]
  }
}
