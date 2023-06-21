import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'teste',
  password: 'admin',
  port: 5432,
});
