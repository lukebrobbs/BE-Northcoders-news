if (!process.env.NODE_ENV) process.env.NODE_ENV = "dev";

const express = require("express");
const apiRouter = require("./routes/api");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { DB } =
  process.env.NODE_ENV === "production"
    ? process.env
    : require("./config")[process.env.NODE_ENV];
mongoose.Promise = Promise;

mongoose
  .connect(DB)
  .then(() => console.log("successfully connected to", DB))
  .catch(err => console.log("connection failed", err));

app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/api", apiRouter);

app.use("/*", (req, res) => {
  res.status(404).send({ Error: "Page not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ Error: "Internal Server Error" });
});

module.exports = app;
