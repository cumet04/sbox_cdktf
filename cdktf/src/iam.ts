import { Construct } from "constructs";
import * as aws from '@cdktf/provider-aws';

export function createIam(scope: Construct, awsAccountId: string, tfstateBackendBucket: string): {} {
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
        },
        {
          // ローカルでの権限の動作検証用に各種ユーザからのswitch roleも許可
          effect: 'Allow',
          principals: [
            {
              type: "AWS",
              identifiers: [`arn:aws:iam::${awsAccountId}:root`]
            }
          ],
          actions: ["sts:AssumeRole"],
        }
      ],
    }).json,
    inlinePolicy: [
      {
        name: "AllowRefreshTfState",
        policy: new aws.iam.DataAwsIamPolicyDocument(scope, "DataAwsIamPolicyDocument.AllowRefreshTfState", {
          statement: [
            {
              effect: "Allow",
              actions: [
                "s3:GetObject",
                "s3:PutObject",
              ],
              resources: [tfstateBackendBucket]
            }
          ]
        }).json
      }
    ]
  })

  return {}
}
