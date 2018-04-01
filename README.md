## Northcoders News API

Welcome to the Northcoders new back-end readme.

You will find the API at https://infinite-garden-99260.herokuapp.com/
<br></br>

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

This collection of routes can also be found on the API homepage.
<br></br>

## Terminal commands

The following commands are accepted in the terminal:

```
npm test
```

Runs a selection of tests, found in the [./spec](./spec/index.spec.js) folder. This runs off a smaller test database, which re-seeds before each set of tests.

```
npm run dev
```

Run the server in a local development environment, accessible at localhost:3000

```
npm run seed
```

Run the main seed file and seed the database. This command will re-seed the database if one already exists. This will only re-seed the development database. To re-seed the hosted database, please speak to an administrator.

Mongoose queries: watch out for find / findOne / findMany. Right tool for the job!
Some weird nesting of describe blocks. Seems thorough - all happy routes are tested.
But no error testing!
