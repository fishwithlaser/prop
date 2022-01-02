exports.handler = async (event: any) => {
  // TODO record logging records to be accounted by postgress -> redshift.
  console.log("the event", event);
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
