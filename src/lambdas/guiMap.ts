import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import { getPropertiesInDecimalDegreeRange } from "./dynamoDb/getPropertiesInDDRange";
import { isDynamoError, isValidInput } from "./helpers/dynamo";
import { guiEventInterface } from "./types/guiMap";

export const frontEndUI: Handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(context);
  if (isValidInput(event)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errorMessage: "invalid input" }),
    };
  }

  const eventBody = JSON.parse(event.body) as guiEventInterface;

  // todo add Property Safety
  const propertyArray = getPropertiesInDecimalDegreeRange(
    eventBody.DecimalDegrees
  );
  if (isDynamoError(propertyArray)) {
    return {
      statusCode: 500,
      body: JSON.stringify({ awsError: propertyArray }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ propertyArray }),
  };
};
