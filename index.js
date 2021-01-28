const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
// create express app
const app = express();

//configure cors
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

//server routing
require("./routes/user.router.js")(app);
require("./routes/c_type.router.js")(app);
require("./routes/contribution.router.js")(app);
require("./routes/report.router.js")(app);

// Configuring the database
const dbConfig = require("./mongodb/index.js");
const mongoose = require("mongoose");

dotenv.config();
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
    // listen for requests
app.listen(process.env.PORT || 1500, () => {
  console.log(`Server started at http://localhost:${process.env.PORT || 1500}`);
});

  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Members system" });
});

