module.exports = (app) => {
  const types = require("../controller/c_type.controller.js");

  // Create a new types
  app.post("/types", types.create);

  // Retrieve all typess
  app.get("/types", types.findAll);

  // Retrieve a single types by id
  app.get("/types/:id", types.findOne);

  // Update a types with id
  app.put("/types/:id", types.update);

  // Delete a types by id
  app.delete("/types/:id", types.delete);
};
