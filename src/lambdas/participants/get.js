'use strict';

const { ResponseHttp } = require('../../utils');
const { ParticipantsUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  if (!event?.pathParameters) {
    return ResponseHttp.reply({
      message: 'Params [pathParameters] is required',
    }, 400)
  }

  const { code } = event.pathParameters;
  const result = await ParticipantsUseCase.get({ code });
  return ResponseHttp.reply(result);
};