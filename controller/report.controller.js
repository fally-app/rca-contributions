const Contributions = require("../model/contribution.model");

exports.getOverall = async (req, res) => {
  const rows = await Contributions.countDocuments({});
  const contributions = await Contributions.find();
  let amount = 0;
  contributions.forEach((element) => {
    amount = amount + element.amount;
  });
  let contributors = [];

  contributions.forEach((element) => {
    if (!contributors.includes(element.member_id.toString())) {
      contributors.push(element.member_id.toString());
    }
  });
  res
    .send({ rows: rows, amount: amount, contributors: contributors.length })
    .status(201);
};

exports.getOverallGivenDate = async (req, res) => {
  const rows = await Contributions.countDocuments({
    $where: createdAt > req.body.minDate,
  });
  const contributions = await Contributions.find({
    $where: createdAt > req.body.minDate,
  });
  let amount = 0;
  contributions.forEach((element) => {
    amount = amount + element.amount;
  });
  let contributors = [];
  contributions.forEach((element) => {
    if (!contributors.includes(element.member_id.toString())) {
      contributors.push(element.member_id.toString());
    }
  });
  res
    .send({ rows: rows, amount: amount, contributors: contributors.length })
    .status(201);
};
