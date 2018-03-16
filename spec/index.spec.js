const app = require("../server");
const { expect } = require("chai");
const request = require("supertest")(app);
const mongoose = require("mongoose");
const user = require("../models/users");
let articleId;
let userId;

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
          articleId = res.body.Articles[0]._id;
        });
    });
    describe("/:article_id/comments", () => {
      it("GET should return status 200 and an object containing all comments belonging to given article", () => {
        return request
          .get(`/api/articles/${articleId}/comments`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.Comments.length).to.be.greaterThan(0);
          });
      });
      it("POST should return status 201 and return an object containting the given comment and a success message.", () => {
        return request
          .post(`/api/articles/${articleId}/comments`)
          .send({ comment: "Test comment" })
          .set({ contentType: "application/json" })
          .expect(201)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.Message).to.equal(
              "Comment: 'Test comment', successfully added"
            );
          });
      });
    });
  });
});
