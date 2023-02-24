const mongoose = require("mongoose");

const Student_schema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please add a first-name"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "please add a first-name"],
  },
  indexNumber: {
    type: Number,
    required: [true, "Provide your index number"],
  },
  gen: {
    type: Number,
    require: [true, "Please provide your index number"],
  },
  phone: {
    type: String,
    length: [20, "phone number cannot excess more than 20"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please provide a valid email. ",
    ],
  },
  profileUrl: {
    type: String,
  },
});

module.exports = mongoose.model("students", Student_schema);
