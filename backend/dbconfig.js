const mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DB_URI;

const connect = () => {
  mongoose
    .connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas:", err);
    });
};

module.exports = connect;
