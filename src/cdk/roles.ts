import { PolicyStatement, Role, ServicePrincipal } from "@aws-cdk/aws-iam";
import { Stack } from "@aws-cdk/core";

export const buildLambdaRole = (stack: Stack, constructId: string): Role => {
  // TODO expand so each role has limited access in the app.
  return new Role(stack, constructId, {
    assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
  });
};

export const buildDynamoPolicyStatement = (
  dynamoTableArn: string
): PolicyStatement => {
  const lambdaDynamoPolicyStatement = new PolicyStatement();
  lambdaDynamoPolicyStatement.addActions(
    "dynamodb:PutItem",
    "dynamodb:GetItem",
    "dynamodb:UpdateItem",
    "dynamodb:Query",
    "dynamodb:Scan"
  );
  lambdaDynamoPolicyStatement.addResources(dynamoTableArn);

  const tableIndices = `${dynamoTableArn}/index/*`;
  lambdaDynamoPolicyStatement.addResources(tableIndices);

  return lambdaDynamoPolicyStatement;
};
