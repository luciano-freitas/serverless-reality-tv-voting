const { ViaCepIntegration } = require('../integrations');
const { UserRepository, ParticipantRepository } = require('../repositories');
const OPERATION = Object.freeze({
  SUM: "+",
  SUB: "-"
});

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
    await mySlowFunction(10000);
    return ParticipantRepository.votes({ code: keys.participant }, OPERATION.SUM);
  }

}

module.exports = UsersUseCase;