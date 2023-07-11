const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    // extract token

    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    // if token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "TOken is missing",
      });
    }
    // we verify the token using secret key
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Tokenn is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: false,
      message: "Something went wrong while validating the token",
    });
  }
};
