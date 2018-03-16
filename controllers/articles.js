const articles = require("../models/articles");
const comments = require("../models/comments");
const user = require("../models/users");

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
function postCommentByArticleId(req, res, next) {
  const newComment = {
    body: req.body.comment,
    article: req.params.article_id
  };

  user
    .findOne()
    .then(user => (newComment.created_by = user._id))
    .then(() => {
      return comments.create(newComment);
    })
    .then(comment => {
      res.status(201).send({
        Message: `Comment: '${comment.body}', successfully added`
      });
    });
}

module.exports = {
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId
};
