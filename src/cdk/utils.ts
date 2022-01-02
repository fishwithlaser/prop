import { Function as LambdaFunction } from "@aws-cdk/aws-lambda";

export const addAwsEnvironmentVariablesToFunction = (
  slackFunction: LambdaFunction,
  awsVars: { [varName: string]: string }
): void => {
  for (const environmentalVar of awsVars.entries) {
    slackFunction.addEnvironment(environmentalVar, awsVars[environmentalVar]);
  }
};
