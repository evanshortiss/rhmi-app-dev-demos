'use strict'

const route = module.exports = require('express').Router()
const env = require('env-var')
const logger = require('log4js').getLogger()
logger.level = env.get('LOG_LEVEL', 'debug').asEnum(['debug', 'info'])

let counter = 0

route.get('/', (req, res) => {
  const name = req.query.name || 'World'
  const count = ++counter;

  logger.debug("greeting endpoint call #" + count + " with name \"" + name + "\"");

  res.json({
    id: count,
    content: `Hello, ${name}!`
  })
})

