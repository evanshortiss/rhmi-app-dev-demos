'use strict'

const env = require('env-var')

module.exports = require('pino')({
  name: 'nodejs-sso-secure',
  level: env.get('LOG_LEVEL', 'debug').asEnum(['trace', 'debug', 'info'])
})
