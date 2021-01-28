const Contributions = require("../model/contribution.model");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);

// validator
const schema = Joi.object().keys({
  member: Joi.ObjectId().required(),
  c_type: Joi.ObjectId().required(),
  amount: Joi.number().required(),
  date: Joi.date() || new Date(),
});
/**
 * Create and Save a new contibutions
 * @param {*} req request
 * @param {*} res response
 */
exports.create = async (req, res) => {
  // validation
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(200).send({
      message: validator.error.details[0].message,
    });

  const create_one = new Contributions(req.body);

  create_one
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the contibution.",
      });
    });
};

// Retrieve and return all contibution from the database.
exports.findAll = (req, res) => {
  Contributions.find()
    .populate("member")
    .populate("c_type")
    .then((contibutions) => {
      res.send(contibutions);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contibutions.",
      });
    });
};

// Find a single contibution with a id
exports.findOne = (req, res) => {
  Contributions.findById(req.params.id)
    .populate("member")
    .populate("c_type")
    .then((contibution) => {
      if (!contibution) {
        return res.status(404).send({
          message: "contibution not found with id " + req.params.id,
        });
      }
      res.send(contibution);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "contibution not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving contibution with id " + req.params.id,
      });
    });
};

// Update a contibution identified by the id in the request
exports.update = (req, res) => {
  //validate contibution
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(404).send({
      message: validator.error.details[0].message,
    });
  // Cre
  // Find contibution and update it with the request body
  Contributions.findByIdAndUpdate(
    req.params.id,
    {
      amount: req.body.amount,
    },
    { new: true }
  )
    .then((contibution) => {
      if (!contibution) {
        return res.status(404).send({
          message: "contibution not found with id " + req.params.id,
        });
      }
      res.send(contibution);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "contibution not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "contibution updating contibution with id " + req.params.id,
      });
    });
};

// Delete a contibution with the specified id in the request
exports.delete = (req, res) => {
  Contributions.findByIdAndRemove(req.params.id)
    .then((contibution) => {
      if (!contibution) {
        return res.status(404).send({
          message: "contibution not found with id " + req.params.id,
        });
      }
      res.send({ message: "contibution deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "contibution not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete contibution with id " + req.params.id,
      });
    });
};
