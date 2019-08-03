'use strict';

const app = require('express')()
const morgan = require('morgan')

app.use('/api/greeting', require('./routes/greeting'))

app.listen(8080, (err) => {
  if (err) {
    throw err;
  }

  console.log('listening on port 8080')
})
