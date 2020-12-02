const Contributions = require("../model/contribution.model");

exports.getOverall = async (req, res) => {
  await Contributions.find()
    .then((report) => {
      res.send(report).status(400);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
};
