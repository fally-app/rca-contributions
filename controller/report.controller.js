const Contributions = require("../model/contribution.model");
const Types = require("../model/c_type.model");
const Users = require("../model/user.model");
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
  let conts  = [];
  let memberCheck = [];
  let types = await Types.find();
  for (let index = 0; index < types.length; index++) {
    const contributions = await Contributions.find({c_type: types[index]._id});
    let sum = 0;
    let members = 0;
    let users = [];
    for (let looper = 0; looper < contributions.length; looper++) {
      sum = sum+contributions[looper].amount;
      members++;
      if(!memberCheck.includes(contributions[looper].member)){
        memberCheck.push(contributions[looper].member)
        let memberdata = await Users.findOne({_id: contributions[looper].member});
        if(memberdata){
          users.push(memberdata);
        }
      }
      // console.log(contributions);
    }
    conts.push({type: types[index],sum: sum,members: members,users: users});
  }
  res
    .send({ conts: conts,rows: rows, amount: amount, contributors: contributors.length })
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
