module.exports = (app) => {
  const contribution = require("../controller/contribution.controller.js");

  // Create a new contribution
  app.post("/contributions", contribution.create);

  // Retrieve all contributions
  app.get("/contributions", contribution.findAll);
  app.get("/contributions/many", contribution.Populated);

  // Retrieve a single contribution by id
  app.get("/contributions/:id", contribution.findOne);

  // Update a contribution with id
  app.put("/contributions/:id", contribution.update);

  // Delete a contribution by id
  app.delete("/contributions/:id", contribution.delete);
};
