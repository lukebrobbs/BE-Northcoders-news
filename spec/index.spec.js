const app = require("../server");
const { expect } = require("chai");
const request = require("supertest")(app);
const mongoose = require("mongoose");
const user = require("../models/users");
let articleId;
let commentId;

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
            commentId = res.body.Comments[0]._id;
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
    describe("/:article_id?vote=up", () => {
      it("PUT should return status code 200 and return the article with an increased vote count of 1", () => {
        return request
          .put(`/api/articles/${articleId}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.article.votes).to.equal(1);
          });
      });
    });
    describe("/:article_id?vote=down", () => {
      it("PUT should return status code 200 and return the article with an reduced vote count of 1", () => {
        return request
          .put(`/api/articles/${articleId}?vote=down`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.article.votes).to.equal(0);
          });
      });
    });
  });
  describe("/comments", () => {
    describe("/:comment_id?vote=up", () => {
      it("PUT should return status code 200 and return the comment with an increased vote count of 1", () => {
        return request
          .put(`/api/comments/${commentId}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.comment.votes).to.be.greaterThan(0);
          });
      });
    });
    describe("/:comment_id?vote=down", () => {
      it("PUT should return status code 200 and return the comment with an reduced vote count of 1", () => {
        return request
          .put(`/api/comments/${commentId}?vote=down`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.comment.votes).to.be.greaterThan(0);
          });
      });
    });
    xdescribe("/comment_id", () => {
      it("DELETE request should ", () => {});
    });
  });
  describe("/users", () => {
    it("GET request should return status 200, along with an object containing all users", () => {
      return request
        .put("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
        });
    });
  });
});
