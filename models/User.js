const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fistName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    requires: true,
  },
  additonalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  image: {
    type: String,
    required: true,
  },
  courseProgress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseProgress",
  },
});

module.exports = mongoose.model("USer", userSchema);
