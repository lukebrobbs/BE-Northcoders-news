const router = require("express").Router();
const { getTopics, getArticlesByTopic } = require("../controllers/topics");

router.get("/", getTopics);
router.get("/:topic/articles", getArticlesByTopic);

module.exports = router;
