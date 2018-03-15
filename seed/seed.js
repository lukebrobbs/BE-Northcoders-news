process.env.NODE_ENV = process.env.NODE_ENV || "dev";
const DB = require("../config").DB[process.env.NODE_ENV];
const { Users, Articles, Comments, Topics } = require("../models/models");
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const fs = require("fs");
const parse = require("csv-parse");
const { promisify } = require("util");

function parseData(path) {
  const promiseReadFile = promisify(fs.readFile);
  const promiseParse = promisify(parse);
  return promiseReadFile(path, "utf8").then(data =>
    promiseParse(data, { columns: true })
  );
}

function seedTopics(topicPath) {
  return parseData(topicPath)
    .then(topicData => Topics.insertMany(topicData))
    .then(newTopic => {
      const ids = {};
      newTopic.forEach(topic => {
        ids[topic.title] = topic._id;
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

// function seedArticles(articlePath) {
//   return parseData(articlePath).then(articleData => {
//     articleData.map(article => {
//       const {title, body, votes,}
//     })
//   })
// }

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
      return seedUsers(__dirname + "/data/users.csv");
    })
    .then(userIds => {
      console.log("Users collection created 👥");
      return seedTopics(__dirname + "/data/topics.csv");
    })
    .then(topicIds => {
      console.log("Topic collection created! 🔖");
    })
    .then(() => {
      console.log("Database seeded! 🌱");
      mongoose.disconnect();
    });
}

seedDatabase();
