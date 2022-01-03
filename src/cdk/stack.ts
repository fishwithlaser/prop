import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as path from "path";

// import * as apigw from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import { buildDataTable } from "./tables";
import {
  addDeletePropertyMethod,
  addPutPropertyMethod,
  addGuiMapMethod,
  setupRateLimiting,
} from "./api";

export class ProperlyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    buildDataTable(this);

    const apiGateWay = new apigw.RestApi(this, "api", {
      description: "api gatewa that does basic property information",
    });

    setupRateLimiting(apiGateWay);

    // add a /put-property resource
    const putPropertyResource = apiGateWay.root.addResource("put-property");
    addPutPropertyMethod(putPropertyResource);

    // add a /delete Property resource
    const deletePropertyResource =
      apiGateWay.root.addResource("delete-property");
    addDeletePropertyMethod(deletePropertyResource);

    // add a /guiMap Property resource
    const guiMapResource = apiGateWay.root.addResource("guiMap");
    addGuiMapMethod(guiMapResource);
  }
}
