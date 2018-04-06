const router = require("express").Router();
const {
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  changeVoteByArticleId,
  getArticleById
} = require("../controllers/articles");

router.get("/", getArticles);
router.put("/:article_id", changeVoteByArticleId);
router
  .route("/:article_id")
  .get(getArticleById)
  .put(changeVoteByArticleId);
router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = router;
