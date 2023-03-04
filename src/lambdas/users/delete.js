'use strict';

const { ResponseHttp } = require('../../utils');
const { UsersUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  if (!event?.pathParameters) {
    return ResponseHttp.reply({
      message: 'Params [pathParameters] is required',
    }, 400)
  }

  const { documentNumber } = event.pathParameters;
  const result = await UsersUseCase.delete({ documentNumber });
  return ResponseHttp.reply(result);
};