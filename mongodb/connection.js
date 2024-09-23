require("dotenv").config();

URI = process.env.MONGO_URI;

const mongoose = require("mongoose");

const mongoconnection = mongoose.connect(URI);

module.exports = { mongoconnection };
