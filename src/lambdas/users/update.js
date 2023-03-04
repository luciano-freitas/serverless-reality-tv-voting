'use strict';

const { ResponseHttp } = require('../../utils');
const { UsersUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const { documentNumber } = event.pathParameters;

  if (!data) {
    return ResponseHttp.reply({
      message: 'Params is required',
    }, 400)
  }

  const result = await UsersUseCase.update({ documentNumber }, data);
  return ResponseHttp.reply(result);
};