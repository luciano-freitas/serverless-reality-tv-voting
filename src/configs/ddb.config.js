"use strict";
const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB({
  endpoint: process.env.DYNAMODB_ENDPOINT
});

var ddbClient = new AWS.DynamoDB.DocumentClient({
  service: ddb,
});

function unmarshall(data) {
  return AWS.DynamoDB.Converter.unmarshall(data);
}

module.exports = { ddb, ddbClient, unmarshall };
