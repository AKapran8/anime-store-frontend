const mongoose = require("mongoose");

const heroesSchema = mongoose.Schema({
  name: { type: String, required: true },
  animeId: { type: String, required: true },
  imageUrl: { type: String },
  quotes: { type: [String] },
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v
    },
  },
});

module.exports = mongoose.model("Hero", heroesSchema, 'heroes');
