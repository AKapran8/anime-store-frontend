const jwt = require("jsonwebtoken");

const chechToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "this_is_really_long_string");
    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: "Failed", message: "You must be logged first to see this page", error });
  }
};

module.exports = chechToken;
