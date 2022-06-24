const db = require("../models");
const User = db.users;
const { uploadFile } = require("../s3");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  const fileLocation = await uploadFile(req.files.avatar);

  const user = {
    username: req.body.username,
    email: req.body.email,
    avatar: fileLocation,
    password: req.body.password,
    birthdate: req.body.birthdate,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.status(204).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {};

// Update a User by the id in the request
exports.update = (req, res) => {};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {};
