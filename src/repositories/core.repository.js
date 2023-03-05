const { Ddb } = require('../configs');

const CoreRepository = {

  create(table, item) {
    const timestamp = new Date().getTime();
    const data = {
      ...item,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const params = {
      TableName: table,
      Item: data
    };

    return Ddb.ddbClient.put(params).promise().then(() => data);
  },

  get(table, keys) {
    const params = {
      TableName: table,
      Key: keys,
    };

    return Ddb.ddbClient.get(params).promise().then(({ Item }) => Item);
  },

  list(table, structure) {
    const params = {
      ...structure,
      TableName: table,
    };

    return Ddb.ddbClient.scan(params).promise();
  },

  delete(table, keys) {
    const params = {
      TableName: table,
      Key: keys,
      ReturnValues: 'ALL_OLD'
    };

    return Ddb.ddbClient.delete(params).promise().then(({ Item }) => Item);
  },

  update(table, structure) {
    const params = {
      ...structure,
      TableName: table,
      ReturnValues: 'ALL_NEW',
    };

    return Ddb.ddbClient.update(params).promise().then(({ Attributes }) => Attributes);
  },

  put(table, item) {
    const timestamp = new Date().getTime();
    const data = {
      ...item,
      updatedAt: timestamp,
    };

    const params = {
      TableName: table,
      Item: data
    };

    return Ddb.ddbClient.put(params).promise().then(() => data);
  },
}

module.exports = CoreRepository;