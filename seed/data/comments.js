const faker = require("faker");

const comments = [];
num = process.env.NODE_ENV === "test" ? 50 : 500;

for (let i = 0; i < num; i++) {
  comments.push({
    body: faker.hacker.phrase(),
    votes: Math.floor(Math.random() * 50)
  });
}

module.exports = comments;
