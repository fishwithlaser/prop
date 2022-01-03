import { AWSError } from "aws-sdk";


export const isDynamoError = (result: any): result is AWSError => {
  return (
    (result as AWSError).code !== undefined &&
    (result as AWSError).message !== undefined
  );
};

export const isValidInput = (event: APIGatewayEvent): boolean => {
  console.warn("TODO: no input valdation. Add validation");
  return true;
};
