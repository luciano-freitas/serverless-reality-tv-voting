'use strict';

const { ResponseHttp } = require('../../utils');
const { ParticipantsUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  const query = event.queryStringParameters;
  const limit = query?.limit || 20;
  const startKey = query?.startKey || null;
  
  const result = await ParticipantsUseCase.list({
    limit,
    startKey: startKey && JSON.parse(startKey)
  });
  return ResponseHttp.reply(result);
};