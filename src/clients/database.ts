import { databaseConfig } from 'environment';
import knex from 'knex';

const isDebug = databaseConfig.isDebug === 'true';

const database = knex({
  client: 'pg',
  connection: {
    user: databaseConfig.user,
    password: databaseConfig.password,
    host: databaseConfig.host,
    database: databaseConfig.database,
    port: Number(databaseConfig.port) || 5432,
  },
});

database
  .on('query', (query) => {
    isDebug && console.debug(`QUERY: ${JSON.stringify(query, null, 2)}`);
  })
  .on('query-response', (queryResponse) => {
    isDebug && console.debug(`QUERY_RESPONSE: ${JSON.stringify(queryResponse, null, 2)}`);
  });

export default database;
