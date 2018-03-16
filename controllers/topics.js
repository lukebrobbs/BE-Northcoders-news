const topic = require("../models/topics");
const articles = require("../models/articles");
const users = require("../models/users");

function getTopics(req, res, next) {
  topic
    .find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
}

function getArticlesByTopic(req, res, next) {
  topic
    .find({ slug: req.params.topic })
    .then(topic => {
      return articles
        .find({ topic: topic[0]._id })
        .populate({ path: "topic", select: "title -_id" })
        .populate({ path: "created_by", select: "name -_id" });
    })
    .then(Articles => {
      res.send({ Articles });
    })
    .catch(next);
}

module.exports = { getTopics, getArticlesByTopic };
