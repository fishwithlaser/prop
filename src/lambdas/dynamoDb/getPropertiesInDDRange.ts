import { AWSError } from "aws-sdk";
import DynamoDB from "aws-sdk/clients/dynamodb";
import { DecimalDegreesParams } from "../types/guiMap";

export const getPropertiesInDecimalDegreeRange = async (
  location: DecimalDegreesParams
): Promise<AWSError | DynamoDB.DocumentClient.QueryOutput> => {
  const dynamoClient = new DynamoDB.DocumentClient();

  const queryParams: DynamoDB.DocumentClient.QueryInput = {
    TableName: "PropertyDataTable",
    IndexName: "longitude",
    KeyConditionExpression:
      "longitude BETWEEN :lonMin AND :lonMax AND sortKey BETWEEN :latmin AND :latMax",
    ExpressionAttributeValues: {
      ":lonMin": location.lonMin,
      ":lonMax": location.lonMax,
      ":latMin": location.latMin,
      ":latMax": location.latMax,
    },
  };

  return await dynamoClient.query(queryParams).promise();
};
