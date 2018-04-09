const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    default: "email@email.com",
    required: true
  },
  password: {
    type: String,
    default: "TestPassword1234",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
    lowercase: true
  }
});

module.exports = mongoose.model("users", UserSchema);
