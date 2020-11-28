module.exports = (app) => {
  const s_admin = require("../controllers/s_admin.controller.js");

  // Create a new s_admin
  app.post("/s_admin", s_admin.create);

  // Retrieve all s_admins
  app.get("/s_admin", s_admin.findAll);

  // Retrieve a single s_admin by id
  app.get("/s_admin/:id", s_admin.findOne);

  // Update a s_admin with id
  app.put("/s_admin/:id", s_admin.update);

  // Delete a s_admin by id
  app.delete("/s_admin/:id", s_admin.delete);

  //Login admin
  app.post("/s_admin/login", s_admin.login);
};
