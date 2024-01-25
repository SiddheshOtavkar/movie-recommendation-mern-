const express = require("express");
const { allFunc } = require("../controllers/movieController");
const router = express.Router();
const movies = require("../config/movies.json");
const movieModel = require("../models/movieModel");

router.get("/movies", allFunc);

// const insertMovies = async () => {
//     try {
//         const docs = await movieModel.insertMany(movies);
//         return Promise.resolve(docs);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }

// insertMovies()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

module.exports = router;
