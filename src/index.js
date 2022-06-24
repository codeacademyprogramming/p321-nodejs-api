const express = require("express");
const cors = require("cors");
const { json } = require("express");
const db = require("../models");

const app = express();
app.use(json());
app.use(cors());

const User = require("../models/user");
User()
  .sync({ force: true })
  .then(() => console.log("Sync complete"));

app.get("/users", (req, res) => {
  res.json([]);
});

app.get("/users/:userId", (req, res) => {
  res.json({});
});

app.post("/users", async (req, res) => {
  const newUser = await User().create({
    username: req.body.username,
    avatar: req.body.avatar,
    birthdate: req.body.birthdate,
    password: req.body.password,
    email: req.body.email,
  });
  newUser.save();

  return res.status(204).send("User successfully created");
});

app.put("/users", (req, res) => {
  return res.status(200).send("User successfully updated");
});

app.delete("/users/:userId", (req, res) => {
  return res.status(200).send("User successfully deleted");
});

const PORT = process.env.PORT;

app.listen(PORT);
