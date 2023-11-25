import { config } from 'dotenv';

config();

// Service settings
export const PORT: number = Number(process.env.PORT) || 3100;
export const ENVIRONMENT: string = process.env.NODE_ENV || 'development';

export const IS_PROD: boolean = ENVIRONMENT === 'production';
export const IS_DEV: boolean = ENVIRONMENT === 'development';
export const IS_TEST_ENV: boolean = ENVIRONMENT === 'test';

// Database
export const DB_HOST_WRITER: string = process.env.DB_HOST_WRITER;
export const DB_HOSTS_READER: string[] = (process.env.DB_HOSTS_READER && JSON.parse(process.env.DB_HOSTS_READER)) || [];
export const DB_NAME: string = process.env.DB_NAME;
export const DB_USERNAME: string = process.env.DB_USERNAME;
export const DB_PASSWORD: string = process.env.DB_PASSWORD;
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;
export const DB_DIALECT: string = process.env.DB_DIALECT || 'postgres';
export const DB_MAX_CONNECTIONS: number = Number(process.env.DB_MAX_CONNECTIONS) || 100;
export const DB_MAX_CONNECTION_WAIT_TIME_MS: number = Number(process.env.DB_MAX_CONNECTION_WAIT_TIME_MS) || 120000;
export const DB_CONNECTION_TIMEOUT_MS: number = Number(process.env.DB_CONNECTION_TIMEOUT_MS) || 60000;
