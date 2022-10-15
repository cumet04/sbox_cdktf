import { Construct } from "constructs";
import * as aws from '@cdktf/provider-aws';

export function createIam(scope: Construct, awsAccountId: string): {} {
  new aws.iam.IamRole(scope, "IamRole.terraformAction", {
    name: "terraformAction",
    assumeRolePolicy: new aws.iam.DataAwsIamPolicyDocument(scope, "DataAwsIamPolicyDocument.terraformAction", {
      version: "2012-10-17",
      statement: [
        {
          effect: 'Allow',
          principals: [
            {
              type: "Federated",
              identifiers: [`arn:aws:iam::${awsAccountId}:oidc-provider/token.actions.githubusercontent.com`]
            }
          ],
          actions: ["sts:AssumeRoleWithWebIdentity"],
          condition: [
            {
              test: "StringLike",
              variable: "token.actions.githubusercontent.com:sub",
              values: ["repo:cumet04/sbox_cdktf:*"]
            }
          ]
        }
      ],
    }).json,
    inlinePolicy: [
      {
        policy: new aws.iam.DataAwsIamPolicyDocument(scope, "DataAwsIamPolicyDocument.policy1", {
          statement: [
            {
              actions: [
                // TODO
              ]
            }
          ]
        }).json
      }
    ]
  })

  return {}
}
