import pkg from "pg";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

const { Pool } = pkg;
// Create a new pool instance with the database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test connection
pool.connect()
  .then(() => console.log(" DB Connected"))
  .catch((err) => console.error("DB Error:", err.message));

export default pool;