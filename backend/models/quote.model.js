// const mongoose = require("mongoose");

// const quoteSchema = mongoose.Schema(
//   {
//     text: { type: String, required: true },
//     season: { type: Number, require: true },
//     episode: { type: Number, require: true },
//     time: { type: String, required: true },
//     author: { type: { authorName: String, id: String }, required: true },
//     animeId: { type: String, required: true },
//   },
//   {
//     toJSON: {
//       transform: function (doc, ret) {
//         if (ret.author && ret.author.authorName) {
//           ret.author = ret.heroes.map((hero) => ({
//             id: hero.id,
//             authorName: hero.authorName,
//           }));
//         }
//       },
//     },
//   }
// );

// module.exports = mongoose.model("Quotes", quoteSchema, "quotes");
