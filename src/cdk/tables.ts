import { Table, AttributeType, BillingMode } from "@aws-cdk/aws-dynamodb";
import { Stack } from "@aws-cdk/core";

export const buildDataTable = (stack: Stack): Table => {
  const tableProps = {
    partitionKey: { name: "partitionKey", type: AttributeType.STRING },
    sortKey: { name: "sortKey", type: AttributeType.STRING },
    billingMode: BillingMode.PAY_PER_REQUEST,
  };

  const properTable = new Table(stack, "SlackDataTable", tableProps);

  // quickest way i could think of keeping large amounts of quickly-indexable properties.
  properTable.addGlobalSecondaryIndex({
    indexName: "latitude",
    partitionKey: { name: "partitionKey", type: AttributeType.STRING },
    sortKey: {
      name: "latitude",
      type: AttributeType.NUMBER,
    },
  });
  properTable.addGlobalSecondaryIndex({
    indexName: "longitude",
    partitionKey: { name: "partitionKey", type: AttributeType.STRING },
    sortKey: {
      name: "longitude",
      type: AttributeType.NUMBER,
    },
  });

  return properTable;
};

export enum DataTypeEnum {
  PROPERTY,
  USER,
}

export const dynamoSortKeys = (
  dataType: DataTypeEnum,
  uuid: string
): string => {
  switch (dataType) {
    case DataTypeEnum.PROPERTY:
      return `PROP${uuid}`;
    case DataTypeEnum.USER:
      return `USER${uuid}`;
    default:
      throw new Error("incorrect DataTypeEnum");
  }
};
