const app = require("../server");
const { expect } = require("chai");
const request = require("supertest")(app);
const mongoose = require("mongoose");

describe("/api", () => {
  describe("/topics", () => {
    it("GET returns status 200 and an object containing all topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics[0]).to.be.an("object");
          expect(res.body.topics[0].title).to.be.a("String");
        });
    });
    describe("/:topic/articles", () => {
      it("GET should return status 200 and an array of objects of articles for given topic", () => {
        return request
          .get("/api/topics/coding/articles")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("Object");
          });
      });
    });
  });
});
