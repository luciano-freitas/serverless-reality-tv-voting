'use strict';

const { ResponseHttp } = require('../../utils');
const { UsersUseCase } = require('../../use-case');

module.exports.handler = async (event, context, callback) => {
  if (!event?.body) {
    return ResponseHttp.reply({
      message: 'Params [body] is required',
    }, 400)
  }

  const data = JSON.parse(event.body);
  const result = await UsersUseCase.create(data);
  return ResponseHttp.reply(result);
};