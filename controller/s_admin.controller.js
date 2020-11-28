const Users = require("../model/s_admin.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { jwt } = require("../utils/auth.jwt");

// validator
const schema = Joi.object().keys({
  fname: Joi.string().min(5).max(30).required(),
  lname: Joi.string().min(5).max(30).required(),
  gender: Joi.string().min(6).max(30).required(),
});
/**
 * Create and Save a new S_Admin
 * @param {*} req request
 * @param {*} res response
 */
exports.create = async (req, res) => {
  var user = await S_admin.findOne({
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
  });
  if (user) {
    return res.send("Email taken").status(2020);
  }
  //Admin validation
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(200).send({
      message: validator.error.details[0].message,
    });
  // Create a S_Admin

  const admin = new S_admin({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    tel: req.body.tel,
    password: encryptPass(req.body.password),
    admin_info: req.body.admin_info,
    admin_code: idGen(6).generate(),
  });

  // Save S_Admin in the database
  admin
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the S_Admin.",
      });
    });
};

// Retrieve and return all s_admin from the database.
exports.findAll = (req, res) => {
  S_admin.find()
    .then((s_admin) => {
      res.send(s_admin);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving s_admin.",
      });
    });
};

// Find a single S_Admin with a id
exports.findOne = (req, res) => {
  S_admin.findById(req.params.id)
    .then((s_admin) => {
      if (!s_admin) {
        return res.status(404).send({
          message: "S_Admin not found with id " + req.params.id,
        });
      }
      res.send(s_admin);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "S_Admin not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving S_Admin with id " + req.params.id,
      });
    });
};

// Update a S_Admin identified by the id in the request
exports.update = (req, res) => {
  //validate s_admin
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(404).send({
      message: validator.error.details[0].message,
    });
  // Cre
  // Find S_Admin and update it with the request body
  S_admin.findByIdAndUpdate(
    req.params.id,
    {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      tel: req.body.tel,
      password: req.body.password,
      admin_info: req.body.admin_info,
      admin_code: req.body.admin_code,
    },
    { new: true }
  )
    .then((s_admin) => {
      if (!s_admin) {
        return res.status(404).send({
          message: "S_Admin not found with id " + req.params.id,
        });
      }
      res.send(s_admin);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "S_Admin not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating S_Admin with id " + req.params.id,
      });
    });
};

// Delete a S_Admin with the specified id in the request
exports.delete = (req, res) => {
  S_admin.findByIdAndRemove(req.params.id)
    .then((s_admin) => {
      if (!s_admin) {
        return res.status(404).send({
          message: "S_Admin not found with id " + req.params.id,
        });
      }
      res.send({ message: "S_Admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "S_Admin not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete S_Admin with id " + req.params.id,
      });
    });
};

exports.login = (req, res) => {
  if (
    !req.body.admin_code ||
    !req.body.password ||
    req.body.password == "" ||
    req.body.admin_code == ""
  ) {
    return res.status(200).send({
      error: true,
      message: "Please provide both code and password!",
    });
  }
  S_admin.findOne({
    admin_code: req.body.admin_code,
  })
    .then((s_admin) => {
      if (!s_admin) {
        return res.status(404).send({
          message: "Invalid code or password",
        });
      }

      const encryped_password = bcrypt.compareSync(
        req.body.password,
        s_admin.password
      );
      if (!encryped_password) {
        return res.status(200).send({
          error: true,
          message: "Invalid email or password",
        });
      }
      var token = jwt.sign({
        admin_code: s_admin.admin_code,
        password: s_admin.password,
      });

      res.send({ token: token, s_admin });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "S_Admin not found",
        });
      }
      return res.status(500).send({
        message: "Error retrieving S_Admin",
      });
    });
};

// {
//     "fname": "Harerimana",
//     "lname": "Egide",
//     "email": "egide123@gmail.com",
//     "tel": ["0567898765"],
//     "password": "12345678",
//     "admin_info": {
//         "date added":"2020-12-12",
//         "furniture": "hobby tonight"
//     }
// }
