const Comments = require("../models/comments.js");

function changeCommentVoteById(req, res, next) {
  // if (req.query.vote !== "up" && req.query.vote !== "down") next();
  const voteChange = req.query.vote === "up" ? 1 : -1;
  Comments.findByIdAndUpdate(
    req.params.comment_id,
    { $inc: { votes: voteChange } },
    { new: true }
  )
    .populate({ path: "article", select: "title -_id" })
    .populate({ path: "created_by", select: "name -_id" })
    .lean()
    .then(comment => {
      res.send({ comment });
    })
    .catch(next);
}

function deleteComment(req, res, next) {
  Comments.findByIdAndRemove(req.params.comment_id)
    .then(deletedComment => {
      res.send({
        message: `Comment '${deletedComment.body}' sucessfully deleted`
      });
    })
    .catch(next);
}

module.exports = { changeCommentVoteById, deleteComment };
