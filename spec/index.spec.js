process.env.NODE_ENV = "test";
const app = require("../server");
const { expect } = require("chai");
const request = require("supertest")(app);

describe("/api", () => {
  describe("/topics", () => {
    it("GET returns starus 200 and an object containing all topics", () => {
      return request
        .get(".api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics[0]).to.be.an("object");
        });
    });
  });
});
