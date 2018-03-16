const router = require("express").Router();
const {
  changeCommentVoteById,
  deleteComment
} = require("../controllers/comments");

router
  .route("/:comment_id")
  .put(changeCommentVoteById)
  .delete(deleteComment);

module.exports = router;
