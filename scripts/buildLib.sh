set -e
set -o pipefail

echo "Compiling CDK source..."
yarn build:cdk

echo "Bundling lambda source..."
yarn build:lambdas

echo "Zipping up lambda bundle..."
yarn zip:lambdas

echo "Removing compiled lambda code..."
rm "./lib/lambdas/userAndChannelCountUpdaterBundle.js"

echo "Done!"