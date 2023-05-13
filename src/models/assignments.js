const mongoose = require("mongoose");

const assignment_schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add a title"],
  },
  indexNumber: {
    type: Number,
    required: [true, "Provide your index number"],
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "students",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  gen: {
    type: Number,
    required: [true, "Please provide your index number"],
  },
  week: {
    type: String,
    required: true,
  },
  github_link: {
    type: String,
  },
  topic: {
    type: String,
  },
  pdfUrl: {
    type: String,
    required: [true, "please provide assignment file"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("assignments", assignment_schema);
