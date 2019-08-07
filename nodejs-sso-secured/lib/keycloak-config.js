'use strict'

const env = require('env-var')

const SSO_REALM = env.get('SSO_REALM', 'rhmi-sso-example').asString()
const SSO_SERVER_URL = env.get('SSO_SERVER_URL', 'http://localhost:8080/auth').asUrlString()
const SSO_RESOURCE = env.get('SSO_RESOURCE', 'nodejs-webapp').asString()

const ssoConfig = module.exports = {
  "realm" : SSO_REALM,
  "auth-server-url" : SSO_SERVER_URL,
  "ssl-required" : "external",
  "resource" : SSO_RESOURCE,
  "public-client" : true,
  "confidential-port": 0
}

console.log('using SSO config: ', ssoConfig)
