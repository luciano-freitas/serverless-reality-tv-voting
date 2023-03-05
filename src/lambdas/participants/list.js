'use strict';

const { ResponseHttp } = require('../../utils');
const { ParticipantsUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  if (!event?.queryStringParameters) {
    return ResponseHttp.reply({
      message: 'Params [queryStringParameters] is required',
    }, 400)
  }

  const { limit, startKey } = event.queryStringParameters;
  const result = await ParticipantsUseCase.list({
    limit,
    startKey: startKey && JSON.parse(startKey)
  });
  return ResponseHttp.reply(result);
};