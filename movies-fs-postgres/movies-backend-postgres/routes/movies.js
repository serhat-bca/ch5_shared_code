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

router.get("/test", (req, res) => {
  res.json({ message: "Test passed" });
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Movie.destroy({
      where: { id: req.params.id },
    });
    if (deleted == 0) {
      res.status(404).json({ message: "Movie not found." });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({error: error})
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, watchlist } = req.body;
    const movie = await Movie.create({ title, watchlist });
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
