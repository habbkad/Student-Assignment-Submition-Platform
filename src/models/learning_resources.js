const mongoose = require("mongoose");

const { Schema } = mongoose;

const resourceSchema = new Schema({
  module: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  resourceLink: {
    type: String,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  stack: {
    type: String,
    required: true,
  },
  locked: {
    type: Boolean,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const resourcesModel = mongoose.model("resources", resourceSchema);

module.exports = resourcesModel;
