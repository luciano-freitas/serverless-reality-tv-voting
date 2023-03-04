'use strict';

const { ResponseHttp } = require('../../utils');
const { UsersUseCase } = require('../../use-case');

module.exports.create = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  if (!data) {
    return ResponseHttp.reply({
      message: 'Params is required',
    }, 400)
  }

  const result = await UsersUseCase.create(data);
  return ResponseHttp.reply(result);
};