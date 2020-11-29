const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", Schema);
