const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    simple_description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("C_Type", Schema);
