const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;
const Contribution_schema = new Schema(
  {
    member_id: {
      type: Types.ObjectId,
      ref: "Member",
    },
    c_type_id: {
      type: Types.ObjectId,
      ref: "C_Type",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Contribution_schema.virtual("member", {
  ref: "Member",
  localField: "member_id",
  foreignField: "_id",
  justOne: true,
});
Contribution_schema.virtual("types", {
  ref: "C_Type",
  localField: "c_type_id",
  foreignField: "_id",
  justOne: true,
});
module.exports = mongoose.model(
  "Contribution",
  Contribution_schema,
  "contributions"
);
