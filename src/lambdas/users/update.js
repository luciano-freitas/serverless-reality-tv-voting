'use strict';

const { ResponseHttp } = require('../../utils');
const { UsersUseCase } = require('../../use-case');

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
  const { documentNumber } = event.pathParameters;
  const result = await UsersUseCase.update({ documentNumber }, data);
  return ResponseHttp.reply(result);
};