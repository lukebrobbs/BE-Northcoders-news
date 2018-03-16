process.env.NODE_ENV = process.env.NODE_ENV || "dev";
const DB = require("../config").DB[process.env.NODE_ENV];
const { Users, Articles, Comments, Topics } = require("../models/models");
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const fs = require("fs");
const parse = require("csv-parse");
const { promisify } = require("util");
const commentsData = require("./data/comments");

function parseData(path) {
  const promiseReadFile = promisify(fs.readFile);
  const promiseParse = promisify(parse);
  return promiseReadFile(path, "utf8").then(data =>
    promiseParse(data, { columns: true })
  );
}

function generateRandom(obj, str) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const randomNum = Math.floor(Math.random() * keys.length);
  if (str === "key") return keys[randomNum];
  if (str === "value") return values[randomNum];
  return undefined;
}

function seedTopics(topicPath) {
  return parseData(topicPath)
    .then(topicData => Topics.insertMany(topicData))
    .then(newTopic => {
      const ids = {};
      newTopic.forEach(topic => {
        ids[topic.slug] = topic._id;
      });
      return ids;
    });
}

function seedUsers(userPath) {
  return parseData(userPath)
    .then(userData => Users.insertMany(userData))
    .then(userData => {
      const ids = {};
      userData.forEach(user => {
        ids[user.username] = user._id;
      });
      return ids;
    });
}

function seedArticles(articlePath, userId, topicId) {
  return parseData(articlePath).then(articleData => {
    const mappedArticles = articleData.map(article => {
      const { title, body, topic: belongs_to, votes, created_by } = article;
      const randomUser = generateRandom(userId, "key");
      article.created_by = userId[randomUser];
      article.belongs_to = topicId[article.topic];
      return article;
    });
    return Articles.insertMany(mappedArticles).then(articles => {
      const ids = {};
      articles.forEach(article => {
        ids[article.title] = article._id;
      });
      return ids;
    });
  });
}

function seedComments(articleId, userId) {
  const articleIds = Object.entries(articleId);
  const userIds = Object.entries(userId);
  const completeComments = commentsData.map(comment => {
    comment.belongs_to = generateRandom(articleId, "value");
    comment.created_by = generateRandom(userId, "value");
    return comment;
  });
  return Comments.insertMany(completeComments);
}

// This should seed your development database using the CSV file data
// Feel free to use the async library, or native Promises, to handle the asynchronicity of the seeding operations.

function seedDatabase() {
  mongoose
    .connect(DB)
    .then(() => {
      console.log(`Connected to ${DB} 📞`);
      return mongoose.connection.db.dropDatabase();
    })
    .then(() => {
      console.log("Database dropped 🗑️");
      return seedUsers(__dirname + "/testData/testUsers.csv");
    })
    .then(userIds => {
      console.log("Users collection created 👥");
      return Promise.all([
        userIds,
        seedTopics(__dirname + "/testData/testTopics.csv")
      ]);
    })
    .then(([userIds, topicIds]) => {
      console.log("Topic collection created! 🔖");
      return Promise.all([
        userIds,
        seedArticles(
          __dirname + "/testData/testArticles.csv",
          userIds,
          topicIds
        )
      ]);
    })
    .then(([userIds, articleIds]) => {
      console.log("Articles collection created! 📖");
      return seedComments(articleIds, userIds);
    })
    .then(() => {
      console.log("Comments collection seeded 🗣");
    })
    .then(() => {
      console.log("Database seeded! 🌱");
      mongoose.disconnect();
    });
}

seedDatabase();
