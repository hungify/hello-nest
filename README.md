<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Requirements

- [Node.js](https://nodejs.org/en/) >= 16.0.0
- [TypeScript](https://www.typescriptlang.org/) >= 4.8.0
- [PostgreSQL](https://www.postgresql.org/) >= 9.6.0

## Installation

```bash
npm install
```

## Running the app

```bash
# development manual
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# development with docker
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Testing

1. http-client

- Send request inside `http-client` folder, each file is a script to run all
  endpoint in module.

2. Postman

- Add script to pre-script tab in postman will be add token to header
  automatically before send request.

```js
const Host = pm.environment.get('baseUrl');
const postRequest = {
  url: `${Host}/auth/login`,
  method: 'POST',
  header: {
    'Content-Type': 'application/json',
  },
  body: {
    mode: 'raw',
    raw: JSON.stringify({ email: 'example@example.com', password: 'example' }),
  },
};

pm.sendRequest(postRequest, (error, response) => {
  console.log(error ? error : response.json());
  const res = response.json();
  pm.globals.set('accessToken', `Bearer ${res.accessToken}`);
});
```

3. Postgres

- Connect Postgres with PgAdmin GUI
- Get the identifier of your Postgres container: `docker ps`
- Print the IP address of this docker image using its identifier:
  `Docker inspect Container ID | grep IPAddress`

## License

Nest is [MIT licensed](LICENSE).
