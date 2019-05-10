# Nodejs Micro Services Example

Rewritting codes of [this good article](https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b) with TypeScript, AWS Serverless, OpenAPI3.0.

![](https://i.imgur.com/ANuiuJj.png)

---

## TypeScript + Node 

The main purpose of this repository is to show a project setup and workflow for writing microservice. The Rest APIs will be using the Swagger (OpenAPI) Specification.

---

## Getting started

### Clone the repository

```shell
git clone  <git lab template url> <project_name>
```

---

### Pre-requisites

- Install Docker for Mac

---

### Setup in local

- Since we can run all docker containers by docker-compose at once,

#### build images

```shell
docker-compose build
```

#### run containers

```shell
docker-compose up
```

#### stop containers

```shell
docker-compose stop
```

#### remove containers

- be careful with this command, this makes init mysql data too.

```shell
docker-compose down
```