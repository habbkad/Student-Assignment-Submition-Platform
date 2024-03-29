const mongoose = require("mongoose");

const Tutor_Schema = mongoose.Schema({
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
  staffId: {
    type: Number,
    required: [true, "Provide your index number"],
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  profileUrl: {
    type: String,
  },
});

module.exports = mongoose.model("tutors", Tutor_Schema);
