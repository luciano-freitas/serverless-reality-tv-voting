const { ParticipantRepository } = require('../repositories');

const mySlowFunction = async (value) => {
  const promise = [];
  for (let i = 0; i < value; i++) {
    promise.push(new Promise((resolve, reject) => {
      const a = ((i * (i * 2) + 1000) / 35) + 80 * 999;
      const b = a * a;
      const c = (b * a / 396573) * 456789;

      resolve(((i * (i * 2) + 1000) / 35) + 80 * 999 + c)
    }))
  }

  return Promise.all(promise)
}

const ParticipantsUseCase = {

  create(data) {
    const { code, name } = data;
    const item = {
      code,
      name,
      votes: 0
    };

    return ParticipantRepository.create(item);
  },

  update(keys, data) {
    const { name } = data;

    const item = {
      name,
    };

    return ParticipantRepository.update(keys, item);
  },

  get(keys) {
    return ParticipantRepository.get(keys);
  },

  delete(keys) {
    return ParticipantRepository.delete(keys);
  },

  async list(filters) {
    await mySlowFunction(10000);

    const result = await ParticipantRepository.list(filters);
    return {
      items: result.Items,
      count: result.Count,
      ...result?.LastEvaluatedKey ? { lastKey: JSON.stringify(result.LastEvaluatedKey) } : {}
    };
  }
}

module.exports = ParticipantsUseCase;