import * as apigw from "@aws-cdk/aws-apigateway";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";

import * as cdk from "@aws-cdk/core";
import { buildDataTable } from "./tables";
import {
  addDeletePropertyMethod,
  addPutPropertyMethod,
  addGuiMapMethod,
  setupRateLimiting,
} from "./api";
import { buildDynamoPolicyStatement } from "./roles";

export class ProperlyStack extends cdk.Stack {
  dynamoDataTable: any;
  mlsHistory: any;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // add dynamo for quick storage of properties
    this.dynamoDataTable = buildDataTable(this);
    buildDynamoPolicyStatement(this.dynamoDataTable.tableArn);

    // add S3 connection for historic MLS information
    this.mlsHistory = new s3.Bucket(this, "mlsHistory", {
      encryption: s3.BucketEncryption.KMS,
      enforceSSL: true,
    });

    const apiGateWay = new apigw.RestApi(this, "api", {
      description: "api gatewa that does basic property information",
    });

    setupRateLimiting(apiGateWay);

    // add a /put-property resource
    const putPropertyResource = apiGateWay.root.addResource("put-property");
    addPutPropertyMethod(this, putPropertyResource);

    // add a /delete Property resource
    const deletePropertyResource =
      apiGateWay.root.addResource("delete-property");
    addDeletePropertyMethod(this, deletePropertyResource);

    // add a /guiMap Property resource
    const guiMapResource = apiGateWay.root.addResource("guiMap");
    addGuiMapMethod(this, guiMapResource);
  }
}

// ____ TO DO ____ - specify queing.
// const queue = new sqs.Queue(this, "ProperQueue", {
//   visibilityTimeout: cdk.Duration.seconds(300),
// });
// const topic = new sns.Topic(this, "ProperTopic");
// props still optional
// TODO ADD POLICY OBJECTS
// TODO ADD IAM ROLES TO PROVISION WHO CAN DO WHAT IN DYNAMO
// TODO ADD CLOUDWATCH

// topic.addSubscription(new subs.SqsSubscription(queue));
