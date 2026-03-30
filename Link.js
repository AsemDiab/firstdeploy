// models/Link.js
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
  },
  { timestamps: true },
); // adds createdAt + updatedAt

module.exports = mongoose.model("Link", linkSchema);
