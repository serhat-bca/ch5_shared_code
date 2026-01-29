const express = require("express");
const router = express.Router();

const Movie = require("../models/movie");
const sequelize = require("../util/db");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((m) => m.id == id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

router.delete("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  console.log("Passed Id: ", id);
  // find method
  const movie = movies.find((m) => m.id == id);
  if (movie) {
    movies = movies.filter((m) => m.id != id);
    res.json({ message: `The movie [${movie.title}] is removed` });
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

router.post("/api/movies", (req, res) => {
  const { title, watchlist } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const movie = {
    id: Date.now(),
    title,
    watchlist: watchlist || false,
  };

  movies.push(movie);
  res.status(201).json(movie);
  // const bodyObject = req.body;

  // const id = Date.now();
  // const title = bodyObject.title;
  // const watchlist = bodyObject.watchlist;

  // if(title) {
  //   const newMovie = {
  //     title: title,
  //     watchlist: watchlist || false,
  //     id: id
  //   }

  //   movies.push(newMovie);
  //   res.json(newMovie);
  // } else {
  //   res.status(400).json({message:"Title is required"})
  // }
});

module.exports = router;
