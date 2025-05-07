// import { Client } from "pg";
// const conn = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "Vipin@postgres@123",
//   database: "demotest"
// })
// await conn.connect();

import { app } from "./app.js";
import { pool } from "./db.js";

(async () => {
  try {
    // Database initialization
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    );
    console.log("Database initialized");
    app.listen(3000, () => console.log(`Server is running on port 3000`));
  } catch (error) {
    console.log(error);
  }
})();
