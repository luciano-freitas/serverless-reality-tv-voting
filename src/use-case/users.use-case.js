const { ViaCepIntegration } = require('../integrations');
const { UserRepository, ParticipantRepository } = require('../repositories');

const UsersUseCase = {

  async create(data) {
    const { documentNumber, name, postalCode, number, complement } = data;
    const addresses = await ViaCepIntegration.getAddressByZipcodeViaCep(postalCode);

    const item = {
      documentNumber,
      name,
      addresses: {
        ...addresses,
        number,
        complement
      }
    };

    return UserRepository.create(item);
  },

  async update(keys, data) {
    const { name, postalCode, number, complement } = data;
    const addresses = await ViaCepIntegration.getAddressByZipcodeViaCep(postalCode);

    const item = {
      name,
      addresses: {
        ...addresses,
        number,
        complement
      }
    };

    return UserRepository.update(keys, item);
  },

  get(keys) {
    return UserRepository.get(keys);
  },

  delete(keys) {
    return UserRepository.delete(keys);
  },

  async list(filters) {
    const result = await UserRepository.list(filters);
    return {
      items: result.Items,
      count: result.Count,
      ...result?.LastEvaluatedKey ? { lastKey: JSON.stringify(result.LastEvaluatedKey) } : {}
    };
  },

  async votes(keys) {
    const { documentNumber, participant } = keys;
    const userBefore = await UserRepository.get({ documentNumber });

    if (userBefore?.participant === participant)
      return { statusCode: 400, message: 'User already voted in this participant' };

    const [userUpdated, participantUpdated] = await (() => {
      if (userBefore?.participant && userBefore?.participant != participant)
        return Promise.all([
          UserRepository.updateParticipant({ documentNumber }, { participant }),
          ParticipantRepository.votes({ code: participant }, '+'),
          ParticipantRepository.votes({ code: userBefore.participant }, '-')
        ]);

      return Promise.all([
        UserRepository.updateParticipant({ documentNumber }, { participant }),
        ParticipantRepository.votes({ code: participant }, '+'),
      ]);
    })();

    return {
      ...userUpdated,
      totalVotesYouParticipant: participantUpdated.votes
    };

  }
}

module.exports = UsersUseCase;