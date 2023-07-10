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
});
