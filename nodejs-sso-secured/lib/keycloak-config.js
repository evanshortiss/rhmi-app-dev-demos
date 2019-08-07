'use strict'

const env = require('env-var')

const SSO_REALM = env.get('SSO_REALM', 'rhmi-sso-example').asString()
const SSO_SERVER_URL = env.get('SSO_SERVER_URL', 'http://localhost:8080/auth').asUrlString()
const SSO_RESOURCE = env.get('SSO_RESOURCE', 'nodejs-webapp').asString()

const ssoConfig = module.exports = {
  "realm": "rhmi-sso-example",
  "auth-server-url": "https://sso-user-sso.apps.rhmiweb-462a.openshiftworkshop.com/auth",
  "ssl-required": "external",
  "resource": "nodejs-webapp",
  "public-client": true,
  "confidential-port": 0
}

console.log('using SSO config: ', ssoConfig)
