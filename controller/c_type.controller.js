const C_Types = require("../model/c_type.model");
const Joi = require("joi");

// validator
const schema = Joi.object().keys({
  title: Joi.string().min(3).max(30).required(),
  simple_description: Joi.string().min(3).max(30),
});
/**
 * Create and Save a new c_types
 * @param {*} req request
 * @param {*} res response
 */
exports.create = async (req, res) => {
  var c_type = await C_Types.findOne({
    title: req.body.title,
  });
  if (c_type) {
    return res.send("c_type exists").status(202);
  }
  //Admin validation
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(200).send({
      message: validator.error.details[0].message,
    });

  const create_one = new C_Types({
    title: req.body.title,
    simple_description: req.body.simple_description,
  });

  create_one
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the c_type.",
      });
    });
};

// Retrieve and return all c_type from the database.
exports.findAll = (req, res) => {
  C_Types.find()
    .then((c_types) => {
      res.send(c_types);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving c_types.",
      });
    });
};

// Find a single c_type with a id
exports.findOne = (req, res) => {
  C_Types.findById(req.params.id)
    .then((c_type) => {
      if (!c_type) {
        return res.status(404).send({
          message: "c_type not found with id " + req.params.id,
        });
      }
      res.send(c_type);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "c_type not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving c_type with id " + req.params.id,
      });
    });
};

// Update a c_type identified by the id in the request
exports.update = (req, res) => {
  //validate c_type
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(404).send({
      message: validator.error.details[0].message,
    });
  // Cre
  // Find c_type and update it with the request body
  C_Types.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      simple_description: req.body.simple_description,
    },
    { new: true }
  )
    .then((c_type) => {
      if (!c_type) {
        return res.status(404).send({
          message: "c_type not found with id " + req.params.id,
        });
      }
      res.send(c_type);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "c_type not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "c_type updating c_type with id " + req.params.id,
      });
    });
};

// Delete a c_type with the specified id in the request
exports.delete = (req, res) => {
  C_Types.findByIdAndRemove(req.params.id)
    .then((c_type) => {
      if (!c_type) {
        return res.status(404).send({
          message: "c_type not found with id " + req.params.id,
        });
      }
      res.send({ message: "c_type deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "c_type not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete c_type with id " + req.params.id,
      });
    });
};
