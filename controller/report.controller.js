const Contributions = require("../model/contribution.model");

exports.getOverall = async () => {
  await Contributions.find().then((report) => {
    resizeBy.send(report).status(400);
  });
};
