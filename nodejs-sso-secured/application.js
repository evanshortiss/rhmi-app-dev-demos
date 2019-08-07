'use strict';

const Keycloak = require('keycloak-connect');
const session = require('express-session')
const express = require('express')
const exphbs = require('express-handlebars')
const env = require('env-var')
const { join } = require('path')
const log = require('./lib/log')

const PORT = env.get('PORT', 8080).asPortNumber()

// Create express application server and setup templating
const app = express()

// Configure server-side rendering
app.engine('handlebars', exphbs())
app.set('views', join(__dirname, '/views'))
app.set('view engine', 'handlebars')

// Keycloak configuration and session store. NOTE: do not use MemoryStore
// for production applications since it leaks memory
const config = require('./lib/keycloak-config')
const store = new session.MemoryStore();
const kc = new Keycloak({ store }, config);

// Configure Kubernetes liveness/readiness probes
require('kube-probe')(app)

// Configure cookies/session management
app.use(session({
  secret: env.get('SESSION_SECRET', 'crappy-default-secret').asString(),
  resave: false,
  saveUninitialized: true,
  store
}));

// Enable logout using keycloak middleware
app.use(kc.middleware({
  logout: '/logout'
}));

app.get('/login', kc.protect(), function (req, res) {
  log.warn(`received requst to /login, but user "${getNameFromToken(req)}" is already logged in. redirecting`)
  // Only requests with a session can pass the "protect()" call above. Redirect
  // them to the welcome page since they are logged in if in this block
  res.redirect('/welcome')
});

// Unprotected homepage
app.get('/', (req, res) => {
  const name = getNameFromToken(req)

  if (!name) {
    log.trace('a user who isn\'t logged in visted the homepage')
  }

  res.render('index.handlebars', {
    // Access user information from keycloak data added to request
    name
  })
})

// Protected screen shown only to logged in users
app.get('/welcome', kc.protect(), (req, res) => {
  log.debug(`user "${getNameFromToken(req)}" visited /welcome page`)
  res.render('welcome.handlebars', {
    // Access user information from keycloak data added to request
    name: getNameFromToken(req)
  })
})

app.get('/admin', kc.protect(adminRoleCheck), (req, res) => {
  log.info(`user "${getNameFromToken(req)}" visited /admin page`)
  res.render('admin.handlebars', {
    name: getNameFromToken(req)
  })
})

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  log.info(`listening on port ${PORT}`)
})

function adminRoleCheck (token, req, res) {
  log.trace('received admin level request. checking token:', token)
  log.debug('verifying token has "admin" role')
  return token.hasRole('admin');
}

function getNameFromToken (req) {
  if (req.kauth && req.kauth.grant && req.kauth.grant.access_token.content.name) {
    return req.kauth.grant.access_token.content.name
  } else {
    log.trace(`unable to fecth name for ${req.originalUrl}, kauth grant not attached to request`)
    return
  }
}
