const axios = require('axios').default
const instance = axios.create({ timeout: 10000 })
module.exports = instance