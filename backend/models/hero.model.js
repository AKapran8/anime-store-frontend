const mongoose = require("mongoose");

const heroesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    animeId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    quotes: { type: [String] || [], required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Hero", heroesSchema, "heroes");
