const Topics = require("../models/topics");
const Articles = require("../models/articles");

function getTopics(req, res, next) {
  Topics.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
}

function getArticlesByTopic(req, res, next) {
  Topics.find({ slug: req.params.topic })
    .then(topic => {
      return Articles.find({ topic: topic[0]._id })
        .populate({ path: "topic", select: "title -_id" })
        .populate("created_by");
    })
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
}

module.exports = { getTopics, getArticlesByTopic };
