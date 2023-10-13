#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ChattingAppStack } from '../lib/chatting_app-stack';

const app = new cdk.App();
new ChattingAppStack(app, 'ChattingAppStack', {
  env: { account: '286845483821', region: 'ap-south-1' },
});