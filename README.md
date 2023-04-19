# be-nestjs-boilerplate-mongod

Boiler plate for nestjs route, logs, docs and auth setup

## Pre-requisite for Development Environment

- NodeJS: v18.15.0
- NPM: v9.5.0
- Yarn: v1.22.19
- OS: Mac 15+ / Ubuntu 20.04LTS+
- Docker version 23.0.3
- Docker Compose version v2.4.1

## Clone repository

```
git clone git@gitlab.com:hotbit-infotech/projects/be-nestjs-boilerplate-mongod.git
```

## Local setup

- Go inside the repo

```
    cd be-nestjs-boilerplate-mongod
```

- Install dependency

```
    yarn or yarn install
```

## Environment file

- Get the .env file from your administrator and add it to the root of directory.
- A sample would look like:

```
    PORT=12345
    DB_PORT=27017
    DB_NAME=hb-boilerplate
    JWT_SECRET_KEY=test-boilerplate
    MONGO_DB_URI=mongodb://mongo_db:27017
```

## Start the application

```
 docker compose up
```

This should start the server at localhost:4000.
Check whether some documentation comes up at localhost:4000/api

## API Documentation

API master documentation can be found at localhost:4000/api

## To be noted

This will make your setup up for proper authentication and authorisation setup.

## Database

This is setup with mongodb which will be exposed at 2718 server
