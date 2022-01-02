import { Table, AttributeType, BillingMode } from "@aws-cdk/aws-dynamodb";
import { Stack } from "@aws-cdk/core";
import { StackParams } from "./types";

export const buildDataTable = (
  stack: Stack,
  appStackParams: StackParams
): Table => {
  const tableProps = appStackParams.slackDataTableCustomProps
    ? appStackParams.slackDataTableCustomProps
    : {
        partitionKey: { name: "partitionKey", type: AttributeType.STRING },
        sortKey: { name: "sortKey", type: AttributeType.STRING },
        billingMode: BillingMode.PAY_PER_REQUEST,
      };

  const properTable = new Table(stack, "SlackDataTable", tableProps);

  // TODO potential for tertiary indexing once more is learned about schema
  // properTable.addGlobalSecondaryIndex({
  //   indexName: "CacheCallbackId-index",
  //   partitionKey: { name: "partitionKey", type: AttributeType.STRING },
  //   sortKey: {
  //     name: "cacheCallbackId",
  //     type: AttributeType.STRING,
  //   },
  // });

  return properTable;
};
