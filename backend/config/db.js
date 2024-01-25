const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://0.0.0.0:27017/IMDB");
        console.log(`Connected to MongoDB Database LocalHost`.bgMagenta.white);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
    }
}

module.exports = connectDB;