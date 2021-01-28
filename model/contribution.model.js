const { date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;
const Contribution_schema = new Schema(
  {
    member: {
      type: Types.ObjectId,
      ref: "Member",
      required: true
    },
    c_type: {
      type: Types.ObjectId,
      ref: "C_Type",
      required: true
    },
    amount: {
      type: Number,
      required: true,
    },
    date:{
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contribution",Contribution_schema);
