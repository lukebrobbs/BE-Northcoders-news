const router = require("express").Router();
const {
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId
} = require("../controllers/articles");

router.get("/", getArticles);
router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = router;
