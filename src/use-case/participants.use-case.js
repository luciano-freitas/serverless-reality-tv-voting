const { ParticipantRepository } = require('../repositories');

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
    const result = await ParticipantRepository.list(filters);
    return {
      items: result.Items,
      count: result.Count,
      ...result?.LastEvaluatedKey ? { lastKey: JSON.stringify(result.LastEvaluatedKey) } : {}
    };
  }
}

module.exports = ParticipantsUseCase;