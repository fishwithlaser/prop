import * as cdk from "@aws-cdk/core";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { join } from "path";

const loggedInUser = (apiGateWay: apigw.LambdaRestApi): void => {
  const loggedIn = apiGateWay.addUsagePlan("uuid", {
    name: "LoggedIn",
    throttle: {
      rateLimit: 1000,
      burstLimit: 2000,
    },
  });

  const loggedInKey = apiGateWay.addApiKey("uuid");
  loggedIn.addApiKey(loggedInKey);
};

const guestUser = (apiGateWay: apigw.LambdaRestApi): void => {
  const guestUser = apiGateWay.addUsagePlan("ipAddresss", {
    name: "Guest",
    throttle: {
      rateLimit: 1000,
      burstLimit: 2000,
    },
  });

  const loggedInKey = apiGateWay.addApiKey("uuid");
  guestUser.addApiKey(loggedInKey);
};

export const setupRateLimiting = (apiGateWay: apigw.LambdaRestApi): void => {
  loggedInUser(apiGateWay);
  guestUser(apiGateWay);
};

const addLambdaToGateway = (
  stack: cdk.Stack,
  lambdaName: string,
  filename: string
): lambda.Function => {
  return new lambda.Function(stack, lambdaName, {
    runtime: lambda.Runtime.NODEJS_14_X,
    handler: "index.main",
    code: lambda.Code.fromAsset(join(__dirname, `/../lib/${filename}`)),
  });
};

export const addPutPropertyMethod = (
  stack: cdk.Stack,
  putProperty: apigw.Resource
): void => {
  putProperty.addMethod(
    "PUT",
    new apigw.LambdaIntegration(
      addLambdaToGateway(stack, "putProperty", "putProperty")
    )
  );
};

export const addDeletePropertyMethod = (
  stack: cdk.Stack,
  deleteProperty: apigw.Resource
): void => {
  deleteProperty.addMethod(
    "DELETE",
    new apigw.LambdaIntegration(
      addLambdaToGateway(stack, "deleteProperty", "deleteProperty")
    )
  );
};

export const addGuiMapMethod = (
  stack: cdk.Stack,
  guiMap: apigw.Resource
): void => {
  guiMap.addMethod(
    "GET",
    new apigw.LambdaIntegration(addLambdaToGateway(stack, "guiMap", "guiMap"))
  );
};
