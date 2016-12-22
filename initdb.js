// initialize the db
// This file contains code to repopulate the DB with test data
var mongoose = require('mongoose');

require('./db/db.js'); // Set up connection and create DB if it does not exists yet

var model = require('./db/model.js'); //get schema

console.log("initialize db");

//check db exit and remove all data
model.User.remove({},function(err){
  console.log("remove users");
  if(err){
    console.log("error in user db remove");
  }
  else{
    addUser();
  }

});

model.Mc.remove({},function(err){
  console.log("remove MCs");
  if(err){
    console.log("error in MC db remove");
  }
  else{
    addMC();
  }

});

function addMC(){
  console.log("add dummy mc");
  var MCs = [
    _mc("mc1", "<i>test1</i>", "1a","1b","1c","1d", "1a", ["tag1", "tag2", "tag3"], "Tony", new Date(2016, 11, 13)),
    _mc("mc2", "<i>test2</i>", "2a","2b","2c","2d", "2a", ["tag4", "tag5", "tag6"], "john", new Date(2016, 11, 10)),
    _mc("mc3", "<i>test3</i>", "3a","3b","3c","3d", "3a", ["tag7", "tag8", "tag9"], "jane", new Date(2016, 11, 11)),
    _mc("mc4", "<i>test4</i>", "4a","4b","4c","4d", "4a", ["tag10", "tag11", "tag12"], "Tony", new Date(2016, 11, 28)),
    _mc("mc5", "<i>test5</i>", "5a","5b","5c","5d", "5a", ["tag13", "tag14", "tag15"], "ryan", new Date(2016, 11, 28)),
    _mc("mc6", "<i>test6</i>", "6a","6b","6c","6d", "6a", ["tag16", "tag17", "tag18"], "ryan", new Date(2016, 11, 28)),
    _mc("mc7", "<i>test7</i>", "7a","7b","7c","7d", "7a", ["tag19", "tag20", "tag21"], "Tony", new Date(2016, 11, 28)),
    _mc("mc8", "<i>test8</i>", "8a","8b","8c","8d", "8a", ["tag22", "tag23", "tag24"], "ryan", new Date(2016, 11, 28)),
    _mc("mc9", "<i>test9</i>", "9a","9b","9c","9d", "9a", ["tag25", "tag26", "tag27"], "Tony", new Date(2016, 11, 28)),
    _mc("mc10", "<i>test10</i>", "10a","10b","10c","10d", "10a", ["tag28", "tag29", "tag30"], "Tony", new Date(2016, 11, 28)),
    _mc("mc11", "<i>test11</i>", "11a","11b","11c","11d", "11a", ["tag31", "tag32", "tag33"], "Tony", new Date(2016, 11, 28))







  ];
  model.Mc.create(MCs, function(err){
    if(err) console.log(err);
    else console.log("mcs db create");
  });
}


function addUser(){
  console.log("add dummy user");

  var Users = [
    _user('john', '123'),
    _user('jane', '456'),
    _user('Tony', '76')
  ];
  model.User.create(Users, function(err){
    if(err) console.log("error in users db create");
    else console.log("users db created");
  });
}

// user class
function _user(username, password) {
  return {
    username: username,
    password: password
  };
}

function _mc(Title, Description, A, B, C, D, Answer, Tags, Creator, LastModfiedTime){
  return {
    Title: Title,
    Description: Description,
    A: A,
    B: B,
    C: C,
    D: D,
    Answer: Answer,
    Tags: Tags,
    Creator: Creator,
    LastModfiedTime: LastModfiedTime
  };
}
