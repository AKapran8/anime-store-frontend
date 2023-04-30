const User = require("./../models/user.model");

const bcryptJS = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcryptJS.hash(password, 10);
    if (!hashedPassword) {
      res.status(500).json({ message: "Server Error" });
    }

    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User was created" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add user" });
  }
};

const loginUser = async (req, res, next) => {
  const requestBody = req.body;

  try {
    const user = await User.findOne({ email: requestBody.email.trim() });
    await bcryptJS.compare(requestBody.password, user.password);

    const signObj = { email: user.email, userId: user.id };
    const secretKey = "this_is_really_long_string";
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

module.exports = {
  loginUser,
  signUpUser,
};
