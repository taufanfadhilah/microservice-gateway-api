const axios = require("axios");
const { TIMEOUT } = process.env;

module.exports = (baseURL) => axios.create({ baseURL, timeout: TIMEOUT });
