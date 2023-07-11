const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

// send otp

exports.sendOTP = async (req, res) => {
  try {
    // fetch email from request body

    const { email } = req.body;

    // check email if user alredy exist

    const checkUserPresent = await User.findOne({ email });
    // id user aready exist

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }
    // generate otp

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp generated", otp);

    // check unique otp or not
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayLoad = { email, otp };

    // create an entry in db

    const otpBody = await OTP.create(otpPayLoad);
    console.log(otpBody);

    // return resposonse;

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// signup

exports.signUp = async (req, res) => {
  try {
    // data fetch from request ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    // validate body

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Please fill all detail for further proccedd",
      });
    }
    // 2 passowrd check
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password did not match",
      });
    }
    // check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already exist",
      });
    }
    // find most recent OTP stored in for the user

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    // validate otp

    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      // invalid otp
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    // password hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    // entry create in db

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additonalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });
    // return response
    return res.status(200).json({
      success: true,
      message: "User Created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered . please try again",
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    // get data from req body
    // valdation data
    // user check exit or not
    // genearte token after password matching
    //
  } catch (error) {}
};
