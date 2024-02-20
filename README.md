# Vending machine

This repository is intended to house a vending machine backend service.

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
PORT=6000

DB_USERNAME=postgres
DB_PASSWORD=password
DB_HOSTS_READER='["localhost"]'
DB_HOST_WRITER=localhost
DB_PORT=5432
DB_NAME=postgres
```

- Finally, to install all of the dependencies, run the following:

```bash
npm ci  # or npm install to update the dependencies as well
```

### Database setup

- Before running the backend service, it is also required to have the local database running along with the migrations
- The database used is `postgres`
- The database instance can be set up locally via `docker`:

```bash
docker run --name vm-db -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
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

- Running the tests can be done by with the following command:

```bash
npm run test
```

### Other links of interest

- [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
