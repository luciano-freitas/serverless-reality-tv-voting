'use strict';

const { ResponseHttp } = require('../../utils');
const { UsersUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  const { documentNumber } = event.pathParameters;

  if (!documentNumber) {
    return ResponseHttp.reply({
      message: 'Params [documentNumber] is required',
    }, 400)
  }

  const result = await UsersUseCase.get({ documentNumber });
  return ResponseHttp.reply(result);
};