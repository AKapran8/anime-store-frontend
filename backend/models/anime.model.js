const mongoose = require("mongoose");

const animeSchema = mongoose.Schema({
  name: { type: String, required: true },
  nameUA: { type: String, required: true },
  stars: { type: Number, required: true },
  status: { type: String, required: true },
  time: { type: Number, required: true },
  heroes: { type: [String] },
  quotes: {type: [String]},
  genres: { type: String },
});

module.exports = mongoose.model("Anime", animeSchema);
