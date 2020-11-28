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
    email: {
      type: String,
      required: true,
    },
    tel: {
      type: Array,
      required: true,
    },
    admin_info: {
      type: Object,
      required: true,
    },
    admin_code: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("S_admin", Schema);
