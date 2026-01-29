const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // to reach environment variables

const sequelize = require("./util/db");

const moviesRouter = require("./routes/movies");

// middleware
// if there is json body passed with the request
// it creates a body object and attach it to request object
app.use(cors());
app.use(express.json());
// use dist folder in the backend
app.use(express.static("dist"));
// implement logger middleware
const reqLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.path}`);
  console.log("Request Body:", req.body);
  console.log("----------------------------");
  // dont forget to call next method like mr.sen
  next();
};
app.use(reqLogger);

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello From Express Server!");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established.");

    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error connecting DB or starting server: ", error);
  }
};

start();
