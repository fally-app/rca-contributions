module.exports = (app) => {
  const members = require("../controller/user.controller.js");

  // Create a new members
  app.post("/members", members.create);

  // Retrieve all memberss
  app.get("/members", members.findAll);

  // Retrieve a single members by id
  app.get("/members/:id", members.findOne);

  // Update a members with id
  app.put("/members/:id", members.update);

  // Delete a members by id
  app.delete("/members/:id", members.delete);
};
