import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lapesfi',
  password: 'admin',
  port: 5432,
});

export default pool;
