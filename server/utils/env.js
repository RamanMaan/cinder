const dotenv = require('dotenv');

const loadEnvFile = () => {
  var result;

  switch((process.env.NODE_ENV || 'development').trim()) {
    case 'production':
      result = dotenv.config({path: '.env.production'});
      break;
    case 'test':
      result = dotenv.config({path: '.env.test'});
      break;
    case 'development':
    default:
      result = dotenv.config({path: '.env'});
      break;
  }

  if (result.error) {
    throw result.error;
  }
};

module.exports = {
  loadEnvFile
};
