var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var jwt = require('jwt-simple');
var JWT_SECRET = 'anthony_is_handsome';

var util = require('./util.js');

// set the view engine to ejs
app.set('view engine', 'ejs');


// routing the css and js
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


// Handle login (authentication) request
app.post('/login', bodyParser.urlencoded({extended: false}));
app.post('/login', function(req, res) {
  if (util.authenticate(req.body.userid, req.body.passwd)) {

    // TODO 1:
    // Write some code here to make use of JWT and Cookie
    // to update the "login" state of the current user (to
    // represent the user has logged in)
    var payload = {
      userid: req.body.userid,
      passwd: req.body.passwd
    };
    var token = jwt.encode( payload, JWT_SECRET);
    // var token = payload.userid + payload.passwd;
    res.cookie('token', token,{
      expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60)
    });

    res.redirect('/'); // Redirect the user to the "main page"
  }
  else { // Show the login page again for failed login attempt

    res.send("wrong");
  }
});



// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
    res.render('public/index');
});


app.listen(8080);
console.log('8080 is the magic port');
