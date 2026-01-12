require("dotenv").config();
const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

app.get("/notes", async (req, res) => {
  const notes = await pool.query("SELECT * FROM notes");
  res.json(notes.rows);
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);
