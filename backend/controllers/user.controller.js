const User = require("./../models/user.model");

const bcryptJS = require("bcryptjs");

const signUpUser = async (req, res, next) => {
  const requestBody = req.body;

  try {
    const hashedPassword = await bcryptJS.hash(requestBody.password.trim(), 10);
    if (!hashedPassword)
      res.status(500).json({ message: `Server Error`, status: "Failed" });

    const newUser = new User({
      email: requestBody.email.trim(),
      password: hashedPassword,
    });

    const createdUser = await newUser.save();

    res.status(201).json({ message: "User was created", user: createdUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to add user", error });
  }
};

const loginUser = async (req, res, next) => {
  const requestBody = req.body;

  try {
    const user = await User.findOne({ email: requestBody.email.trim() });
    if (!user) res.status(404).json({ message: "User not found" });


  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = {
  loginUser,
  signUpUser,
};
