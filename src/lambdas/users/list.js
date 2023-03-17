'use strict';

const { ResponseHttp } = require('../../utils');
const { UsersUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  const query = event.queryStringParameters;
  const limit = query?.limit || 20;
  const startKey = query?.startKey || null;
  
  const result = await UsersUseCase.list({
    limit,
    startKey: startKey && JSON.parse(startKey)
  });
  return ResponseHttp.reply(result);
};