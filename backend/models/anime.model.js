const mongoose = require("mongoose");

const animeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    nameUA: { type: String, required: true },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    rating: { type: Number, required: true },
    status: { type: String, required: true },
    time: { type: Number, required: true },
    heroes: {
      type: [{ heroName: String, id: String, imageUrl: String }],
      default: [],
    },
    genres: { type: String },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        if (ret.heroes && ret.heroes.length) {
          ret.heroes = ret.heroes.map((hero) => ({
            id: hero.id,
            heroName: hero.heroName,
            imageUrl: hero.imageUrl,
          }));
        }
      },
    },
  }
);

module.exports = mongoose.model("Anime", animeSchema, "anime");
