const Report = require("../controller/report.controller");
module.exports = (app) => {
  app.get("/reports", Report.getOverall);
};
