require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express();
const morgan = require("morgan")
const colors = require("colors")
const connectDB = require("./config/db")
const movieRoutes = require("./routes/movieRoutes");

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", movieRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
