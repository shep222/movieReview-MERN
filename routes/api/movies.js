const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Movie = require("../../models/Movie");

// @route    Post api/movies
// @desc     Create a Movie
// @access   Private

router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("director", "Director is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        poster: req.body.poster,
        createdBy: req.user.id,
        // actor: req.body.actor.name,
        rating: req.body.rating,
      });
      const movie = await newMovie.save();
      res.json(movie);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    Get api/movies
// @desc     Get all movies
// @access   Public

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    Get api/movie/:id
// @desc     Get movie by id
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Movie not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    Delete api/posts/:id
// @desc     Delete a post
// @access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(401).json({ msg: "Movie not found" });
    }

    //Check user
    if (movie.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }

    await movie.remove();

    res.json({ msg: "Movie Removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Movie not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
