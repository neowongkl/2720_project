var express = require('express');
var app = express();

// require body-parser for  psot
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //handle body json obj

// require cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// require jwt for hashing
var jwt = require('jwt-simple');
var JWT_SECRET = 'anthony_is_handsome';

require("./db/db.js");
var model = require("./db/model.js");

// routing the css and js
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js',express.static(__dirname + '/public/controllers')); //redirect controllers


app.get('/checkCookie', function(req, res){
  console.log("check cookie");
  var userid = null;

  if(req.cookies.token != undefined){
    console.log("cookie is found")
    var token = req.cookies.token;
    var decoded = jwt.decode(token, JWT_SECRET);
    userid = decoded['userid'];
  }
  res.json(userid)

});

app.post('/login', bodyParser.urlencoded({extended: true}));
app.post('/login', function(req, res) {
  console.log("longin: "+ req.body.userid);

  var payload = {
    userid: req.body.userid,
    passwd: req.body.passwd
  };

  // authentication of user
  model.User.findOne(
    {username: payload.userid, password: payload.passwd},
    function(err, user){
      if(err){
        console.log("err in find user");
        res.status(500).jsonp({ error: 'find user error' });
      }
      if(user == null){
        console.log("user not found")
        res.json(null);
      }
      else{
        console.log("find user");
        var token = jwt.encode( payload, JWT_SECRET);
        res.cookie('token', token,{
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60)
        });
        // res.redirect('/'); // Redirect the user to the "main page"
        res.json(user.username); // Redirect back to current page
      }
  });

});


app.get('/viewMC', function(req, res){
  console.log("go to viewMC.html")
  res.sendFile(__dirname + '/public/viewMC.html')
});

app.use('/',express.static(__dirname + '/public'));

app.listen(8080);
console.log('8080 is the magic port');
