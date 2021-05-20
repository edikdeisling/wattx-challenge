const fs = require('fs');
const dotenv = require('dotenv-flow');

const filenames = dotenv
  .listDotenvFiles('.', { node_env: 'development' })
  .filter((file) => fs.existsSync(file));
const envVariables = dotenv.parse(filenames);

const config = {
  '/api': {
    target: envVariables.API_URL,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
    bypass(req) {
      req.headers['X-CMC_PRO_API_KEY'] = envVariables.API_KEY;
    },
  },
};

module.exports = config;
