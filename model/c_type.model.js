const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;
const TypeSchema = new Schema(
  {
    title: {
      type: Types.String,
      required: true,
    },
    simple_description: {
      type: Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TypeSchema.virtual("contributions", {
  ref: "Contribution",
  localField: "_id",
  foreignField: "c_type_id",
  justOne: false,
});

module.exports = mongoose.model("C_Type", TypeSchema, "c_types");
