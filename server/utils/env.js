const dotenv = require('dotenv');

const loadEnvFile = () => {
  switch((process.env.NODE_ENV || 'development').trim()) {
    case 'production':
      dotenv.config({path: '.env.production'});
      break;
    case 'test':
      dotenv.config({path: '.env.test'});
      break;
    case 'development':
    default:
      dotenv.config({path: '.env'});
      break;
  }
};

module.exports = {
  loadEnvFile
};
