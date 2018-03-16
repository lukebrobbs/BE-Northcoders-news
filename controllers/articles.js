const articles = require("../models/articles");
const comments = require("../models/comments");

function getArticles(req, res, next) {
  articles
    .find()
    .populate({ path: "topic", select: "title -_id" })
    .populate({ path: "created_by", select: "name -_id" })
    .then(Articles => {
      res.send({ Articles });
    })
    .catch(next);
}

function getCommentsByArticleId(req, res, next) {
  comments
    .find({ article: req.params.article_id })
    .populate({ path: "article", select: "title -_id" })
    .populate({ path: "created_by", select: "name -_id" })
    .then(Comments => {
      res.send({ Comments });
    })
    .catch(next);
}

module.exports = { getArticles, getCommentsByArticleId };
