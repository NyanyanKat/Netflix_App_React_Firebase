const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    //
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json("Operation Forbidden: Administrator Privilege Required");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json("Operation Forbidden: Administrator Privilege Required");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json(`Movie with id:${req.params.id} has been deleted`);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json("Operation Forbidden: Administrator Privilege Required");
  }
});

// GET MOVIE
// specify /find/:id instead of /:id .... so /random to not be confused as id
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET RANDOM
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL MOVIES
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find().sort({ _id: -1 });
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json("Operation Forbidden: Administrator Privilege Required");
  }
});
module.exports = router;
