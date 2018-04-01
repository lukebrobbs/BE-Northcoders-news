## Northcoders News API

### Background

We will be building the API which we used in the Northcoders News Sprint during the Front End block of the course.

Our database will be MongoDB. Your Mongoose models have been created for you so that you can see what the data should look like.

We have also built a functioning API at http://northcoders-news-api.herokuapp.com/.

Look closely at the response you get for each route on http://northcoders-news-api.herokuapp.com/ You will notice that we also send data such as the comment count for each article. You will need to think carefully about how to do this in your API.

### Mongoose Documentation

The below are all model methods that you call on your models.

* [find](http://mongoosejs.com/docs/api.html#model_Model.find)
* [findOne](http://mongoosejs.com/docs/api.html#model_Model.findOne)
* [findOneAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)
* [findOneAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove)
* [findById](http://mongoosejs.com/docs/api.html#model_Model.findById)
* [findByIdAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)
* [findByIdAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove)
* [update](http://mongoosejs.com/docs/api.html#model_Model.update)

There are also some methods that can be called on the documents that get returned. These are:

* [remove](http://mongoosejs.com/docs/api.html#model_Model-remove)
* [save](http://mongoosejs.com/docs/api.html#model_Model-save)
* [count](http://mongoosejs.com/docs/api.html#model_Model.count)

### Step 1 - Seeding

The test database has already been seeded for you, so you only need to write a seed file for the development database.

1.  The data for users, articles and topics has been provided in CSV format (comma separated values). This is a common export format for spreadsheets. You will need to parse this data to make it available within your JavaScript application.
2.  You will need to seed the topics, followed by the articles and the users. Each article should belong to a topic, referenced by a topic's \_id property. Each article should also have a random number of comments. Each comment should have been created by a random user (referenced by their \_id property) and should also belong to a specific article (referenced by its \_id property too). Use a library such as [faker](https://www.npmjs.com/package/faker) or [chance](https://www.npmjs.com/package/chance) to generate random comments.

### Step 2 - Building and Testing

1.  Build your Express App
2.  Mount an API Router onto your app
3.  Define the routes described below
4.  Define controller functions for each of your routes
5.  Test each route as you go. Remember to test the happy and the unhappy paths! Make sure your error messages are helpful and your error status codes are chosen correctly. Remember to seed the test database using the seeding function and make the saved data available to use within your test suite.
6.  Once you have all your routes start to tackle responding with the vote and comment counts on article requests like this http://northcoders-news-api.herokuapp.com/api/articles

### Routes

```
GET /api
```

Serves an HTML page with documentation for all the available endpoints

```
GET /api/topics
```

Get all the topics

```
GET /api/topics/:topic_id/articles
```

Return all the articles for a certain topic

```
GET /api/articles
```

Returns all the articles

```
GET /api/articles/:article_id/comments
```

Get all the comments for a individual article

```
POST /api/articles/:article_id/comments
```

Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: {"comment": "This is my new comment"}

```
PUT /api/articles/:article_id
```

Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: /api/articles/:article_id?vote=up

```
PUT /api/comments/:comment_id
```

Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: /api/comments/:comment_id?vote=down

```
DELETE /api/comments/:comment_id
```

Deletes a comment

```
GET /api/users/:username
```

Returns a JSON object with the profile data for the specified user.

https://infinite-garden-99260.herokuapp.com/
