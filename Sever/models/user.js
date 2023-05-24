const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    birthdate: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["","male", "female"]
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    badge: {
      type: Array,
    },
    location: {
        type: String,
    },
    bio: {
        type: String,
    },
    userPhoto: {
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
