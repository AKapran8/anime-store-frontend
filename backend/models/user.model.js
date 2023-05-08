const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true}
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema, "users");
