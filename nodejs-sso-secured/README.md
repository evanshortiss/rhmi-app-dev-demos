# SSO Secured Application

A simple web applicaiton that demonstrates an application leveraging Red Hat
SSO for authentication and authorisation. Read the `SSO Configuration` section
below to ensure SSO is setup correctly - during local development you can set
it up before starting the Node.js application, but on OpenShift you need
to create a Route before you can configure SSO.

This application can also demonstrate logging features since it includes a
configurable logger.

## Usage

_NOTE: Requires Node.js 10 or later_

```bash
npm install
npm start
```

This starts a server on http://localhost:8080.


## Deploy using OpenShift Source to Image

```
oc new-app nodejs:10~$THIS_REPO_URL --context-dir=nodejs-sso-secured --name=nodejs-sso-secured
```

## Applicaiton Configuration
If using the included `realm-export.json` you can ignore this section, but if
you'd like to integrate with a custom RH SSO/Keycloak realm you can set the
following environment variables for the Node.js applicaiton:

* SSO_REALM (default: rhmi-sso-example) - Realm name from SSO/Keycloak
* SSO_SERVER_URL (default: http://localhost:8080/auth) - The SSO/Keycloak URL
* SSO_RESOURCE (default: nodejs-webapp) - Client name from SSO/Keycloak
* LOG_LEVEL (default: debug) - Can be trace, debug, or info

## SSO Configuration

To use this application you'll need to have a running Red Hat SSO (Keycloak)
instance with the correct configuration applied. If you're using an RHMI
cluster then this is already taken care of. If testing locally you can run a
Keycloak instance on port 8080 using Docker like so:

```
docker run -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -p 8080:8080 jboss/keycloak 
```

In the RH SSO/Keycloak UI choose `Add realm` using the dropdown on the left
of the admin UI. In the `Add realm` UI choose use the `Select file` option and
upload the `realm-export.json` file in this repo. Ensure `Enabled` is `ON` and
the name is `rhmi-sso-example`.

Once the Realm is created navigate to `Clients`, select `nodejs-webapp`, and
update the URLs on the `Settings` page to match the URL of the deployed
Node.js application.

Finally, create users under the `Manage` section on the left. Create two users,
e.g `admin` and `developer`. Make sure `Email Verified` is set to `ON` when
doing so and enter a `First Name` and `Last Name` too. After creating each
user you will need to view them and use the `Credentials` tab to set their
password - make sure `Temporary` is set to `OFF`. For one user, open the
`Role Mappings` tab beside `Credentials`, select `nodejs-webapp` under the
`Client Roles` and assign the `admin` role.
