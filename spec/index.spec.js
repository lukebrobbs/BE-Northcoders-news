const app = require("../server");
const { expect } = require("chai");
const request = require("supertest")(app);
const mongoose = require("mongoose");
let id;
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
            expect(res.body.Articles[0].title).to.equal("Running a Node App");
          });
      });
    });
  });
  describe("/articles", () => {
    it("GET should return a status 200 and an object containing all articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.Articles[0].topic.title).to.equal("Coding");
          id = res.body.Articles[0]._id;
        });
    });
    describe("/:article_id/comments", () => {
      it("GET should return status 200 and an object containing all comments belonging to given article", () => {
        return request
          .get(`/api/articles/${id}/comments`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.Comments.length).to.be.greaterThan(0);
          });
      });
    });
  });
});
