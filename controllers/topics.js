const topic = require("../models/topics");

function getTopics(req, res, next) {
  topic.find().then(topics => {
    res.send({ topics });
  });
}

module.exports = { getTopics };
