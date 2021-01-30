const Contributions = require("../model/contribution.model");
const Types = require("../model/c_type.model");

exports.getOverall = async (req, res) => {
  const rows = await Contributions.countDocuments({});
  const contributions = await Contributions.find();
  let amount = 0;
  contributions.forEach((element) => {
    amount = amount + element.amount;
  });
  let contributors = [];

  contributions.forEach((element) => {
    if (!contributors.includes(element.member.toString())) {
      contributors.push(element.member.toString());
    }
  });
  const types = await Types.find();
  types.forEach(element => {
    contributions.forEach(el => {
      if(element._id =el.c_type){
        element.amount = element.amount || 0 +el.amount;
        element.nContributors = element.nContributors || 0 + 1; 
      }
    });
  });
  res
    .send({ types: types,rows: rows, amount: amount, contributors: contributors.length })
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
    if (!contributors.includes(element.member.toString())) {
      contributors.push(element.member.toString());
    }
  });
  res
    .send({ rows: rows, amount: amount, contributors: contributors.length })
    .status(201);
};
