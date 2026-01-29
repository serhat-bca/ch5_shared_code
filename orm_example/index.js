const express = require("express");
const booksRouter = require("./routes/books");
const sequelize = require("./util/db");
require("dotenv").config();

const app = express();

app.use("/api/books", booksRouter);

const port = process.env.PORT;

// connect to db and start the server

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection Established!");

    await sequelize.sync();
    app.listen(port, () => console.log(`Server listening on ${port}`));
  } catch (error) {
    console.log("Failed to start the server: ", error);
  }
};

start();
