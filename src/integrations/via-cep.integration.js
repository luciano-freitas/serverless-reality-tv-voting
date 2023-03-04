const { Request } = require('../configs');

const getAddressByZipcodeViaCep = async (zipcode) => {
  const result = await Request.get(`${process.env.API_ZIPCODE_VIACEP_ENDPOINT}/${zipcode}/json/`)
  return formatAddressByViaCep(result.data)
}

const formatAddressByViaCep = (data) => ({
  streetAddress: data?.logradouro,
  district: data?.bairro,
  postalCode: data?.cep?.replace(/[^\d]+/g, ''),
  addressLocality: data?.localidade,
  addressRegion: data?.uf?.toUpperCase(),
  localityCode: data?.ibge?.toString(),
  ddd: data.ddd
});

module.exports = {
  getAddressByZipcodeViaCep
}