const { ParticipantRepository } = require('../repositories');

const ParticipantsUseCase = {

  async create(data) {
    const { code, name } = data;
    const item = {
      code,
      name
    };

    return ParticipantRepository.create(item);
  },

  async update(keys, data) {
    const { name, votes } = data;

    const item = {
      name,
      votes
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
    const result = await ParticipantRepository.list(filters);
    return {
      items: result.Items,
      count: result.Count,
      ...result?.LastEvaluatedKey ? { lastKey: JSON.stringify(result.LastEvaluatedKey) } : {}
    };
  }
}

module.exports = ParticipantsUseCase;