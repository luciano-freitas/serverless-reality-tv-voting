const CoreRepository = require('./core.repository');
const TABLE = process.env.DYNAMODB_TABLE_USERS;

const UserRepository = {

  create(item) {
    return CoreRepository.create(TABLE, item);
  },

  get(keys) {
    return CoreRepository.get(TABLE, keys);
  },

  delete(keys) {
    return CoreRepository.delete(TABLE, keys);
  },

  update(keys, item) {
    const structure = {
      Key: {
        documentNumber: keys.documentNumber,
      },
      ExpressionAttributeNames: {
        '#name': 'name',
        '#updatedAt': 'updatedAt',
        '#addresses': 'addresses',
      },
      ExpressionAttributeValues: {
        ':name': item.name,
        ':addresses': item.addresses,
        ':updatedAt': Date.now(),
      },
      UpdateExpression: 'SET #name = :name, #updatedAt = :updatedAt, #addresses = :addresses',
    }

    return CoreRepository.update(TABLE, structure);
  }

}

module.exports = UserRepository;