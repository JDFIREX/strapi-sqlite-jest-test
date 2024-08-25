# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

## Initialize project

- Run `npm i` to install the dependencies along with the filenet provider,
- Copy `.env.example` as `.env` file.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

- Run `docker-compose up`

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
```

### `test`

Test your Strapi application

```
npm run test:install
npm run test
npm run test:uninstall
```

## Content-versioning

To enable content-versioning for given content-type you need to:

- Go to plugins/Content-Type Builder
- Go inside the chosen collection type
- Click the `edit` button
- Go to the `advanced settings`
- Tick `Enable versioning for this Content-Type`
- Click `Finish` button

OR

Set `versions` for `pluginOptions` in `schema.json`

```
"pluginOptions": {
  "versions": {
    "versioned": true
  }
}
```
# Tests
requires:
 - node v 16.16.0 +
 - python 3.12+ (for node-gyp) installed globally on your machine
 - node-gyp installed globally on your machine
 - @types/jest
 - @types/node
 - better-sqlite3
 - cross-env
 - jest
 - ts-jest
 - supertest
