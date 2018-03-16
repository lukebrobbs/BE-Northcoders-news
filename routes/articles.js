const router = require("express").Router();
const {
  getArticles,
  getCommentsByArticleId
} = require("../controllers/articles");

router.get("/", getArticles);
router.get("/:article_id/comments", getCommentsByArticleId);

module.exports = router;
