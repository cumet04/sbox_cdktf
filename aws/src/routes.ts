import { Construct } from "constructs";
import * as aws from '@cdktf/provider-aws';

export function createRoutes(scope: Construct, vpcId: string, publicSubnetIds: string[]): {} {
  const igw = new aws.vpc.InternetGateway(scope, "igwMain", { vpcId })

  const table = new aws.vpc.RouteTable(scope, "rtTable", { vpcId })
  new aws.vpc.Route(scope, "rtPublic", {
    destinationCidrBlock: "0.0.0.0/0",
    routeTableId: table.id,
    gatewayId: igw.id,
  })
  publicSubnetIds.forEach((id, idx) => {
    new aws.vpc.RouteTableAssociation(scope, `rtaPublic${idx}`, { subnetId: id, routeTableId: table.id })
  })

  return {}
}
