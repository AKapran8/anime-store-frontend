const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
  name: { type: String, required: true },
  animeId: { type: String, required: true },
  image: { type: String },
  quotes: { type: [String] },
});

module.exports = mongoose.model("Hero", heroSchema);
