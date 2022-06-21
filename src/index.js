const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

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

const USERS = Array.from({ length: 10 }).map((val) => {
  return createRandomUser();
});

const app = express();
app.use(cors());

app.get("/users", (req, res) => {
  res.json(USERS);
});

app.get("/users/:userId", (req, res) => {
  if (!Boolean(req.params.userId)) {
    return res.status(400).send("User Id required");
  }
  const foundUser = USERS.find((user) => user.userId === req.params.userId);

  if (!foundUser) {
    return res.status(404).send("User not found");
  }

  res.json(foundUser);
});

app.post("/users", (req, res) => {
  const userId = faker.datatype.uuid();
  const newUser = { ...req.body.user, userId };
  USERS.push(newUser);
  return res.status(204).send("User successfully created");
});

app.delete("/users/:userId", (req, res) => {
  const indexOfUser = USERS.findIndex(
    (user) => user.userId === req.params.userId
  );
  if (indexOfUser === -1) {
    return res.status(404).send("User with the given ID not found");
  }

  USERS.splice(indexOfUser, 1);
  return res.status(200).send("User successfully deleted");
});

app.listen(process.env.PORT || 3333);

// module.exports = {
//   USERS,
//   createRandomUser,
// };

// responseObject = {
//    error: ,
//    status: ,
//    data: ,
// }
