import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'lapesfi',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
};

export default config;
