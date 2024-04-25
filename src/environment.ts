import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}` });

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  URL,
  ADMIN_LOGIN,
  ADMIN_PASSWORD,
  DB_DEBUG,
} = process.env;

export const databaseConfig = {
  host: DB_HOST,
  password: DB_PASSWORD,
  user: DB_USER,
  port: DB_PORT,
  isDebug: DB_DEBUG,
  database: 'fsm',
};

export const apiConfig = {
  url: URL,
  admin: {
    login: ADMIN_LOGIN,
    password: ADMIN_PASSWORD,
  },
};
