# Spring Boot

A simple Spring Boot server that exposes a greeting API at `GET /api/greeting`.

## Local Usage

_NOTE: Requires Java 8 and Maven 3.x_

```bash
mvn install
mvn package

java -jar target/hello-world-0.0.1-SNAPSHOT.jar
```

This starts a server on http://localhost:8080

## Deploy using OpenShift Source to Image

```
oc new-app redhat-openjdk18-openshift~$THIS_REPO_URL --context-dir=java
```