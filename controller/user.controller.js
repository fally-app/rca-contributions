const Users = require("../model/user.model");
const Joi = require("joi");
const { jwt } = require("../utils/auth.jwt");

// validator
const schema = Joi.object().keys({
  fname: Joi.string().min(5).max(30).required(),
  lname: Joi.string().min(5).max(30).required(),
  gender: Joi.string().min(6).max(30).required(),
});
/**
 * Create and Save a new Users
 * @param {*} req request
 * @param {*} res response
 */
exports.create = async (req, res) => {
  var user = await Users.findOne({
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
  });
  if (user) {
    return res.send("User exists").status(202);
  }
  //Admin validation
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(200).send({
      message: validator.error.details[0].message,
    });

  const create_one = new Users({
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
  });

  create_one
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
  Users.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with a id
exports.findOne = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with id " + req.params.id,
      });
    });
};

// Update a user identified by the id in the request
exports.update = (req, res) => {
  //validate user
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(404).send({
      message: validator.error.details[0].message,
    });
  // Cre
  // Find user and update it with the request body
  Users.findByIdAndUpdate(
    req.params.id,
    {
      fname: req.body.fname,
      lname: req.body.lname,
      gender: req.body.gender,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "User updating user with id " + req.params.id,
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  Users.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      res.send({ message: "user deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id,
      });
    });
};
