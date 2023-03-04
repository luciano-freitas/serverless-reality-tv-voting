const CoreRepository = require('./core.repository');

const UserRepository = {

  async create(item) {
    const table = process.env.DYNAMODB_TABLE_USERS;
    return CoreRepository.create(table, item);
  }

}

module.exports = UserRepository;