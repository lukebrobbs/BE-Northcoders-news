const router = require("express").Router();
const topicRouter = require("./topics");

router.use("/topics", topicRouter);

module.exports = router;
