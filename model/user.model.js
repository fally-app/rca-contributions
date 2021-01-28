const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;
const UserSchema = new Schema(
  {
    fname: {
      type: Types.String,
      required: true,
    },
    lname: {
      type: Types.String,
      required: true,
    },
    gender: {
      type: Types.String,
      required: true,
      enum: ["Male", "Female"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", UserSchema);
