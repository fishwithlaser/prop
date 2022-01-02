import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

// import * as apigw from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";

export class ProperlyStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    StackParams: any, // TODO add saftey
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    // ____ TO DO ____
    // const queue = new sqs.Queue(this, "ProperQueue", {
    //   visibilityTimeout: cdk.Duration.seconds(300),
    // });
    // const topic = new sns.Topic(this, "ProperTopic");

    // props still optional
    // TODO ADD POLICY OBJECTS
    // TODO ADD IAM ROLES TO PROVISION WHO CAN DO WHAT IN DYNAMO
    // TODO ADD CLOUDWATCH

    // topic.addSubscription(new subs.SqsSubscription(queue));
    const calculator = new lambda.Function(this, "CalculatorHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("src"),
      handler: "calculator.handler",
    });

    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: calculator,
    });
  }
}
