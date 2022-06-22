const app = require("../index");

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

app.put("/users", (req, res) => {
  const userId = req.body.user.userId;
  USERS = USERS.map((user) => {
    if (user.userId === userId) {
      return { ...user, ...req.body.user };
    }

    return user;
  });

  return res.status(200).send("User successfully updated");
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
