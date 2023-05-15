const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const activitySchema = new Schema({
  type: {
    type: String,
    enum: ["walking", "running", "cycling", "hiking", "swimming"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  loaction: {
    type: String,
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
  },
  feeling: {
    type: String,
    enum: ["","best", "good", "normal", "bad", "worst"],
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
