const User = require("./../models/user.model");
const Anime = require("./../models/anime.model");
const Hero = require("./../models/hero.model");
const Quote = require("./../models/quote.model");

const bcryptJS = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcryptJS.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Server Error" });
    }

    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User was created" });
  } catch (error) {
    res.status(500).json({ message: "Email  was existed" });
  }
};

const loginUser = async (req, res, next) => {
  const requestBody = req.body;

  try {
    const user = await User.findOne({ email: requestBody.email.trim() });
    await bcryptJS.compare(requestBody.password, user.password);

    const signObj = { email: user.email, userId: user.id };
    const secretKey = process.env.JWT_SECRET_KEY;
    const tokenSettings = {
      expiresIn: "1h",
    };

    const token = jwt.sign(signObj, secretKey, tokenSettings);
    const expiredAfter = 3600; // expiresIn to seconds
    const userName = user.name;
    const userId = user.id;

    res.status(200).json({
      message: "Sucess",
      data: { token, expiredAfter, userName, userId },
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid authentification credentials" });
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findOneAndRemove({ _id: userId });
    if (!user) return res.status(404).json({ message: "user not found" });

    await Anime.deleteMany({ userId: userId });
    await Hero.deleteMany({ userId: userId });
    await Quote.deleteMany({ userId: userId });

    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  loginUser,
  signUpUser,
  deleteUser,
};
