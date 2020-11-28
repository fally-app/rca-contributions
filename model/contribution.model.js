const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    member_id: {
      type: String,
      required: true,
    },
    c_type_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contribution", Schema);
