# Vending machine

This repository is intended to house the backend part for the builder onboarding.

### Local setup

- This local setup is provided as is, the extensions with `vscode` are optional
- In order to run the formatter with `vscode`, the prettier extension needs to be installed
- After installing the extension, add the following `json` to your `.vscode/settings.json` file:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "jest.jestCommandLine": "npm run test --",
  "jest.autoRun": "off"
}
```

- To be able to run and see the tests with `vscode`, install the jest extension
- To have the `launch` options with `vscode`, add the following `json` to your `.vscode/launch.json` file:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node-terminal",
      "request": "launch",
      "name": "Local run",
      "command": "npm run dev"
    },
    {
      "type": "node-terminal",
      "request": "launch",
      "name": "Tests run",
      "command": "npm run test"
    }
  ]
}
```

- In order to have the local environment variables set up, add the following `.env` file in the root of the project (replace `xxx` with concrete values):

```
NODE_ENV=development
PORT=80

DB_USERNAME=xxx
DB_PASSWORD=xxx
DB_HOSTS_READER=xxx
DB_HOST_WRITER=xxx
DB_PORT=5432
DB_NAME=builderonboarding

SUPPLY_MAIN_SERVICE_BASE_URL=xxx
SUPPLY_MAIN_TOKEN=xxx

PLATFORM_BASE_PATH=https://platform-sandbox.a.team

BUILDER_ONBOARDING_URL=http://localhost:8001/builder/

CLIENT_ONBOARDING_URL=https://onboarding-dev.a.team/client/

PLATFORM_API_SERVICE_BASE_URL=xxx
PLATFORM_API_SERVICE_API_KEY=sandbox

ATEAM_EMAIL_BASE_PATH=https://user-notification-service.eks.a.team
ATEAM_EMAIL_API_KEY=xxx

JWT_SECRET=sandbox

RABBITMQ_CONNECTION_URL=amqp://rabbitmq:5672

DEACTIVATE_SESSIONS_JOB_SCHEDULE='* * * * *'

BUILDER_ONBOARDING_SERVICE_BASE_URL='http://localhost:8001'
BUILDER_ONBOARDING_FRONTEND_BASE_URL='http://localhost:8002/builder'

AUTH_JWT_SECRET=sandbox
```

- Finally, to install all of the dependencies, run the following:

```bash
npm login # dashlane for secrets
npm ci  # or npm install to update the dependencies as well
```

### Rabbitmq setup

- The rabbitmq instance can be set up locally via `docker`:

```bash
docker run --rm -it -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

### Database setup

- Before running the backend service, it is also required to have the local database running along with the migrations
- The database used is `postgres`
- The database instance can be set up locally via `docker`:

```bash
docker run --name builder-onboarding-db -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
```

- Before running the backend service, it is also required to run the migrations:

```bash
npx sequelize-cli db:migrate # --url 'connection-url' to run remotely
```

- Undoing all of the migrations can be done by running the following:

```bash
npx sequelize-cli db:migrate:undo:all # --url 'connection-url' to run remotely
```

- Adding a new migration:

```bash
npx sequelize-cli migration:generate --name new-migration-name
```

### Running the service

- In order to run the service locally, after all of the steps, run the following command:

```bash
npm run dev
```

- To run it via `docker`:

```bash
docker build -f .docker/build.dockerfile -t builder-onboarding-svc --build-arg NPM_TOKEN=token .
docker run -it --init builder-onboarding-svc
```

- Running the tests can be done by with the following command:

```bash
npm run test
```

### Links of interest

- [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Growth team documentation](https://www.notion.so/ateams/Documentation-375ea337779c49cda5a832d3bb161b88)
