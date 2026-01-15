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

app.post("/notes", async (req, res) => {
  const result = await pool.query(
    "insert into notes (content) values ('note from http call') returning * "
  );

  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);
