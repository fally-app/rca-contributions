const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    member_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    c_type_id: {
      type: mongoose.Types.ObjectId,
      ref: "C_Type",
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
