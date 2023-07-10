const mongoose = require("mongoose");

require("dotenv").config();
const username = encodeURIComponent("ujjwal");
const password = encodeURIComponent("Uietece@1923");
const MONGO_URL = `mongodb+srv://${username}:${password}@cluster0.lltc1zb.mongodb.net/Auth_db?retryWrites=true&w=majority`;

exports.connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connectedd");
  } catch (error) {
    console.log(error);
    console.log("Error while connecting to datbase");
  }
};
