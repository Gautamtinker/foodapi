// config/database.js

const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:123456789@localhost:5432/mydatabase",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: async () => {
    try {
      const client = await pool.connect();
      console.log("Connected to the database");
      client.release();
    } catch (err) {
      console.error("Error connecting to the database:", err);
      throw err;
    }
  },
};
