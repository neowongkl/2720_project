var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var UserSchema = Schema({
  username: { type: String, required: true, unique: true, maxlength: 12 },
  password: { type: String, required: true }
});

// TODO nned to change
var MCSchema = Schema({
  // QuestionID: { type: Number, index: true, unique: true},
  Title: { type: String, required: true},
  Description: { type: String, required: true},
  A: { type: String, required: true},
  B: { type: String, required: true},
  C: { type: String, required: true},
  D: { type: String, required: true},
  Answer: { type: String, required: true},
  Tags: [{ type: String, required: true}],
  Creator: { type: String, required: true},
  LastModfiedTime : { type: Date, default: Date.now, required: true }
});

var User = mongoose.model('User', UserSchema);
var Mc = mongoose.model('Mc', MCSchema);

// make this available to our users in our Node applications
module.exports = {
  User: User,
  Mc: Mc
};
