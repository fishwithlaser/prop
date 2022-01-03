# Welcome to your CDK TypeScript API project (wip)!

# Deploying
To deploy the app run:
`cdk bootstrap` logs in and allows future activity - will require setting up [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html)
`cdk deploy`deploys the difference in the cdk.out folder

Configurations (though ver much a WIP) all exist in the src/cdk folder and are written on top of CDK and cloudformation.

# Useful commands  
`yarn build` - builds project
`yarn deploy` - deploys project

# Stack 
Though WIP, I am using a lambda connected to APIgateway, and DynamoDb. [Provisioned concurrency](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html) helps scale backend performance to load.

# Database Rationale
## Website performance
I am using dynamo as it's scalable, performant, and adaptable - with rate limiting configured in APIGateway RestApi
Retrieving filtered properties from a database at a speed that is acceptable for smooth usage is a non trivial problem. 
Here, I am using a [Global Secondary Index](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html) to enable quick index and return property information by allowing the user to search for a numeric range commensurate to the user's monitor.   

# TODO:
- implement dynamo client
