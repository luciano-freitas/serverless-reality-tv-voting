'use strict';

const { ResponseHttp } = require('../../utils');
const { ParticipantsUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  if (!event?.body) {
    return ResponseHttp.reply({
      message: 'Params [body] is required',
    }, 400)
  }

  if (!event?.pathParameters) {
    return ResponseHttp.reply({
      message: 'Params [pathParameters] is required',
    }, 400)
  }

  const data = JSON.parse(event.body);
  const { code } = event.pathParameters;
  const result = await ParticipantsUseCase.update({ code }, data);
  return ResponseHttp.reply(result);
};