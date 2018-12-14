// keys.js - Determine what sort of credentials to return...DEV or PROD?   committed.

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
