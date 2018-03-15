const faker = require("faker");

const comments = [];

for (let i = 0; i < 500; i++) {
  comments.push({
    body: faker.hacker.phrase(),
    votes: Math.floor(Math.random() * 50)
  });
}

module.exports = comments;
