const users = require("../models/users");

function getUsers(req, res, next) {
  users
    .find()
    .then(users => {
      res.send({ users });
    })
    .catch(next);
}

function getUserById(req, res, next) {
  users
    .find({ _id: req.params.user_id })
    .then(user => {
      res.send({ user });
    })
    .catch(next);
}

module.exports = { getUsers, getUserById };
