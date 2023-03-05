const { Ddb } = require('../configs');
const CoreRepository = require('./core.repository');
const TABLE = process.env.DYNAMODB_TABLE_PARTICIPANTS;

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
        code: keys.code,
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
  },

  /**
   * @summary increase and remove votes of participants
   * @param type "+" OR "-"
   */
  async votes(keys, type) {
    const structure = {
      TableName: TABLE,
      Key: {
        "code": {
          "S": keys.code
        }
      },
      ExpressionAttributeValues: {
        ":value": { N: "1" },
      },
      UpdateExpression: `SET votes = votes ${type} :value`,
      ReturnValues: 'ALL_NEW'
    }
    const result = (await Ddb.ddb.updateItem(structure).promise()).Attributes;
    return Ddb.unmarshall(result);
  }

}

module.exports = ParticipantRepository;