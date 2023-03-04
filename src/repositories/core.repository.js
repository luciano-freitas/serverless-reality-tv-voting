const { Ddb } = require('../configs');

const CoreRepository = {

  async create(table, item) {
    const timestamp = new Date().getTime();
    const params = {
      TableName: table,
      Item: {
        ...item,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    return Ddb.ddbClient.put(params).promise();
  }
}

module.exports = CoreRepository;