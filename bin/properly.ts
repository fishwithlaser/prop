#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ProperlyStack } from '../lib/properly-stack';

const app = new cdk.App();
new ProperlyStack(app, 'ProperlyStack');
