const Articles = require("../models/articles");
const Comments = require("../models/comments");
const User = require("../models/users");

function getArticles(req, res, next) {
  Articles.find()
    .populate({ path: "topic", select: "title -_id" })
    .populate("created_by")
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
}

function getArticleById(req, res, next) {
  Articles.find({ _id: req.params.article_id })
    .populate("created_by")
    .then(article => {
      res.send({ article });
    })
    .catch(next);
}

function getCommentsByArticleId(req, res, next) {
  Comments.find({ article: req.params.article_id })
    .populate({ path: "article", select: "title -_id" })
    .populate({ path: "created_by", select: "username -_id" })
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
}
function postCommentByArticleId(req, res, next) {
  const newComment = {
    body: req.body.comment,
    article: req.params.article_id
  };

  User.findOne()
    .then(user => (newComment.created_by = user._id))
    .then(() => {
      return Comments.create(newComment);
    })
    .then(comment => {
      res.status(201).send({
        Message: `Comment: '${comment.body}', successfully added`
      });
    })
    .catch(err => {
      err.status = 400;
      err.message =
        "This route requires a JSON body with a comment key and value pair";
      return next(err);
    });
}
function changeVoteByArticleId(req, res, next) {
  if (req.query.vote !== "up" && req.query.vote !== "down") next();
  const voteChange = req.query.vote === "up" ? 1 : -1;
  Articles.findByIdAndUpdate(
    req.params.article_id,
    {
      $inc: { votes: voteChange }
    },
    { new: true }
  )
    .populate({ path: "topic", select: "title -_id" })
    .populate({ path: "created_by", select: "username -_id" })
    .lean()
    .then(article => {
      res.send({ article });
    })
    .catch(next);
}

module.exports = {
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  changeVoteByArticleId,
  getArticleById
};
