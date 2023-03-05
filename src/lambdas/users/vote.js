'use strict';

const { ResponseHttp } = require('../../utils');
const { UsersUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  if (!event?.pathParameters) {
    return ResponseHttp.reply({
      message: 'Params [pathParameters] is required',
    }, 400)
  }

  const { documentNumber, participant } = event.pathParameters;
  const result = await UsersUseCase.votes({ documentNumber, participant });
  return ResponseHttp.reply(result, result?.statusCode || 200);
};