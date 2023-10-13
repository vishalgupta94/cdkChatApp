import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { WebSocketApi } from '@aws-cdk/aws-apigatewayv2-alpha'
import * as apigwci2 from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import { WebSocketLambdaAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import * as path from 'path'
export class ChattingAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const connect = new NodejsFunction(this, 'connect', {
      handler: 'handler',
      entry: path.join(process.cwd(),'handlers/connect/index.ts')
    })

    const disconnect = new NodejsFunction(this, 'disconnect', {
      handler: 'handler',
      entry: path.join(process.cwd(),'handlers/disconnect/index.ts')
    })

    const socketApi = new WebSocketApi(this, 'WebSocketAPI', {
      connectRouteOptions: {
        integration: new apigwci2.WebSocketLambdaIntegration('ConnectIntegration', connect),
      },
      disconnectRouteOptions: {
        integration: new apigwci2.WebSocketLambdaIntegration('DisConnectIntegration', disconnect)
      }
    })
  }
}
