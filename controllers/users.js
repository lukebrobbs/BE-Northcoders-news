const Users = require("../models/users");

function getUsers(req, res, next) {
  Users.find()
    .then(users => {
      res.send({ users });
    })
    .catch(next);
}

function getUserById(req, res, next) {
  Users.find({ _id: req.params.user_id })
    .then(user => {
      res.send({ user });
    })
    .catch(next);
}

module.exports = { getUsers, getUserById };
