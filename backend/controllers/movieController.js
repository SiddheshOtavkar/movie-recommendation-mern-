const movieModel = require("../models/movieModel");

const allFunc = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = req.query.genre || "All";

        const genreOptions = [
            "Action",
            "Romance",
            "Fantasy",
            "Drama",
            "Crime",
            "Adventure",
            "Thriller",
            "Music",
            "Family"
        ]

        // genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.split(","));
        genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.genre.split(","));
        // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const movies = await movieModel.find({ name: { $regex: search, $options: "i" } })
            .where("genre")
            .in([...genre])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit)

        const total = await movieModel.countDocuments({
            genre: { $in: [...genre] },
            name: { $regex: search, $options: "i" }
        })

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            genres: genreOptions,
            movies
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

module.exports = { allFunc };