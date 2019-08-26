'use strict';

const app = require('express')()
const env = require('env-var')
const morgan = require('morgan')

const MORGAN_ENABLED = env.get('MORGAN_ENABLED', 'false').asBool()

// Need to set this to true since OpenShift uses HAProxy to route requests
app.set('trust proxy', true);

// If MORGAN_ENABLED is set to true, this will log incoming requests
app.use(morgan('combined', {
  skip: () => !MORGAN_ENABLED
}))

app.use('/api/greeting', require('./routes/greeting'))

app.listen(8080, (err) => {
  if (err) {
    throw err;
  }

  console.log('listening on port 8080')
})
