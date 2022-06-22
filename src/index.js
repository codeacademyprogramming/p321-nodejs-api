const express = require("express");
const cors = require("cors");
const db = require("./models");
const { faker } = require("@faker-js/faker");
const { json } = require("express");

function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

let USERS = Array.from({ length: 10 }).map((val) => {
  return createRandomUser();
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.listen(process.env.PORT || 3333);

module.exports = app;
