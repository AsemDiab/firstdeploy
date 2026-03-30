const mongoose = require("mongoose");
const dotenv = require("dotenv");

require("dotenv").config({ path: __dirname + "/.env" });
async function connectDB() {
  const result = await mongoose.connect(process.env.MONGO_URI);
  console.log(process.env.MONGO_URI);
  console.log("MongoDB connected");
}

module.exports = connectDB;
