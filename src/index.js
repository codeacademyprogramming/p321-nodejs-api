const express = require("express");
const cors = require("cors");
const db = require("./models");
const { json } = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// importing routes
require("./routes/users.routes")(app);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.listen(process.env.PORT || 3333);

module.exports = app;
