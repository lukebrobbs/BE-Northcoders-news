const app = require("./server");
const { PORT } =
  process.env.NODE_ENV === "production"
    ? process.env
    : require("../config")[process.env.NODE_ENV];

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});
