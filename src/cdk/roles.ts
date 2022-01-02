import { Role, ServicePrincipal } from "@aws-cdk/aws-iam";
import { Stack } from "@aws-cdk/core";

export const buildLambdaRole = (stack: Stack, constructId: string): Role => {
  return new Role(stack, constructId, {
    assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
  });
};
