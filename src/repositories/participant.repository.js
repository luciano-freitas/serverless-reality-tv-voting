const CoreRepository = require('./core.repository');
const TABLE = process.env.DYNAMODB_TABLE_PARTICIPANT;

const ParticipantRepository = {

  create(item) {
    return CoreRepository.create(TABLE, item);
  },

  get(keys) {
    return CoreRepository.get(TABLE, keys);
  },

  delete(keys) {
    return CoreRepository.delete(TABLE, keys);
  },

  list(filters) {
    const structure = {
      Limit: filters?.limit || 20,
      ...filters?.startKey ? { ExclusiveStartKey: filters.startKey } : {},
    }
    return CoreRepository.list(TABLE, structure);
  },

  update(keys, item) {
    const structure = {
      Key: {
        documentNumber: keys.documentNumber,
      },
      ExpressionAttributeNames: {
        '#name': 'name',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':name': item.name,
        ':updatedAt': Date.now(),
      },
      UpdateExpression: 'SET #name = :name, #updatedAt = :updatedAt',
    }

    return CoreRepository.update(TABLE, structure);
  }

}

module.exports = ParticipantRepository;