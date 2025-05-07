import { Pool } from "pg";

import { DB_URL, NODE_ENV } from "./configs/index.js";

const pool = new Pool({
  connectionString: DB_URL,
  ssl: { rejectUnauthorized: false },
});

export { pool };
