// load mongoose since we need it to define a model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
users = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE"],
  },
});
module.exports = mongoose.model("C-Users", users);
