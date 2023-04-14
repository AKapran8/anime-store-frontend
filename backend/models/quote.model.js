const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema({
  text: { type: String, required: true },
  season: { type: Number, required: true },
  time: { type: String, required: true },
  edisode: { type: Number, required: true },
  animeId: { type: String, required: true },
  heroId: { type: String, required: true },
});

module.exports = mongoose.model("Quote", quoteSchema);
