# Node.js

A simple Node.js server that exposes a greeting API at `GET /api/greeting`.

## Usage

_NOTE: Requires Node.js 10 or later_

```bash
npm install
npm start
```

This starts a server on http://localhost:8080


## Deploy using OpenShift Source to Image

```
oc new-app registry.redhat.io/openshift3/nodejs-010-rhel7~$THIS_REPO_URL --context-dir=java
```
