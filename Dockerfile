FROM node:18-alpine
RUN apk add yarn
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./.env .

RUN yarn install --silent

ADD . .

CMD ["yarn", "run", "start:dev"]