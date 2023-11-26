import {
  DB_CONNECTION_TIMEOUT_MS,
  DB_DIALECT,
  DB_HOSTS_READER,
  DB_HOST_WRITER,
  DB_MAX_CONNECTIONS,
  DB_MAX_CONNECTION_WAIT_TIME_MS,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  IS_TEST_ENV,
} from '@config/index';
import { Dialect, Options, Sequelize } from 'sequelize';

const sequelizeOptions: Options = {
  dialect: DB_DIALECT as Dialect,
  logging: false,
  dialectOptions: {
    statement_timeout: DB_CONNECTION_TIMEOUT_MS,
  },
  pool: {
    max: DB_MAX_CONNECTIONS,
    acquire: DB_MAX_CONNECTION_WAIT_TIME_MS,
  },
  replication: {
    read: DB_HOSTS_READER.map((instance: string) => ({ host: instance, username: DB_USERNAME, password: DB_PASSWORD, port: DB_PORT })),
    write: { host: DB_HOST_WRITER, username: DB_USERNAME, password: DB_PASSWORD, port: DB_PORT },
  },
};

const sequelizeTestOptions: Options = {
  storage: ':memory:',
  logging: false,
};

export default new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, IS_TEST_ENV ? sequelizeTestOptions : sequelizeOptions);
