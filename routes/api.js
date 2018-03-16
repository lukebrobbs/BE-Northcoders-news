const router = require("express").Router();
const topicRouter = require("./topics");
const articleRouter = require("./articles");

router.use("/topics", topicRouter);
router.use("/articles", articleRouter);

module.exports = router;
