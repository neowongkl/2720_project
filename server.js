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

// view engine setup
app.set('view engine', 'pug');

// app.use(express.static(path.join(__dirname, 'public')));

// routing the css and js
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/public/stylesheets')); // redirect CSS bootstrap
app.use('/js',express.static(__dirname + '/controllers')); //redirect controllers
app.use('/js',express.static(__dirname + '/public/js')); //redirect controllers
app.use('/img',express.static(__dirname + '/public/images')); //redirect controllers


app.post('/updatemc/:id', function(req, res){
  console.log("update mc");
  var id = req.params.id;
  var tags = req.body.Tags;
  if (tags) {
    tags = tags.match(/[^\s,]+/g);
    if (tags == null)
      tags = [];
  }
  else
    tags = [];

  var mc = {
    Creator: req.body.Creator,
    Title: req.body.Title,
    Description: req.body.Description,
    A: req.body.A,
    B: req.body.B,
    C: req.body.C,
    D: req.body.D,
    Answer: req.body.Answer,
    Tags: tags
  }
  model.Mc.findByIdAndUpdate(id, mc, function (err, response) {
    if (err) return handleError(err);
    res.json(response);
  });
});
// add mc
app.post('/addmc', function(req, res){
  console.log("add mc");

  var tags = req.body.Tags;
  if (tags) {
    tags = tags.match(/[^\s,]+/g);
    if (tags == null)
      tags = [];
  }
  else
    tags = [];

  var mc = {
    Creator: req.body.Creator,
    Title: req.body.Title,
    Description: req.body.Description,
    A: req.body.A,
    B: req.body.B,
    C: req.body.C,
    D: req.body.D,
    Answer: req.body.Answer,
    Tags: tags
  }
  model.Mc.create(mc, function(err, response){
    if(err){
      res.json(err);
    }
    res.json(response);
  });

});

// get one mc
app.get('/getonemc/:id', function(req, res){
  console.log("get one mc");
  var id = req.params.id;
  model.Mc.findOne({_id: id}, function(err, mc){
    res.json(mc);
  });
});

// delete one mc from detail page
app.delete('/deleteMC/:id',function(req, res){
    var id = req.params.id;
    console.log(id);
    model.Mc.remove({_id: id}, function(err, items){
      res.json(items);
    });
});

// delete one mc
app.delete('/delete/:id',function(req, res){
    var id = req.params.id;
    console.log(id);
    model.Mc.remove({_id: id}, function(err, items){
      res.json(items);
    });
});

// get all mc
app.get('/getmcs', function(req, res){
  console.log("get mcs");
  model.Mc.find({}, function(err, mcs){
    if(err){
      console.log("err in get mc");
      console.log(err);
      res.sendStatus(500);
    }
    res.json(mcs);
  });
});

// check cookie and get username
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

app.get('/logout', function(req, res){
  console.log("logout");
  res.clearCookie('token');
  res.redirect('back');
  // res.redirect('/');
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
        res.redirect('back');
        // res.redirect('/');
      }
      if(user == null){
        console.log("user not found");
        res.redirect('back');
        // res.redirect('/');
      }
      else{
        console.log("find user");
        var token = jwt.encode( payload, JWT_SECRET);
        res.cookie('token', token,{
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60)
        });
        res.redirect('back');
        // res.redirect('/'); // Redirect the user to the "main page"
      }
  });

});

// go to view mc
app.get('/viewMC', function(req, res){
  console.log("go to viewMC.html");
  var username;
  if(req.cookies.token != undefined){
    console.log("have cookie");
    var token = req.cookies.token;
    var decoded = jwt.decode(token, JWT_SECRET);
    model.User.findOne(
      {username: decoded['userid'], password: decoded['passwd']},
      function(err, user){
        if(err){
          console.log("err in find user: go to public viewMC");
          res.render('public/simpleMC', { user: username});
        }
        if(user == null){
          console.log("user not found: go to public viewMC");
          res.render('public/simpleMC', { user: username});
        }
        else{
          console.log("find user: go to private viewMC");
          username = decoded['userid'];
          // res.sendFile(__dirname + '/public/viewMCforprivate.html');
          res.render('private/viewMCforprivate', { user: username});
        }
    });
  }
  else{
    console.log("no cookie: go to public viewMC");
    res.render('public/simpleMC', { user: username});
  }
});

//  go to  index
app.get('/', function (req, res) {
  console.log("go to index.html");
  var username;
  if(req.cookies.token != undefined){
    console.log("have cookie");
    var token = req.cookies.token;
    var decoded = jwt.decode(token, JWT_SECRET);
    model.User.findOne(
      {username: decoded['userid'], password: decoded['passwd']},
      function(err, user){
        if(err){
          console.log("err in find user: go to public index");
          res.render('public/index', { user: username});
        }
        if(user == null){
          console.log("user not found: go to public index");
          res.render('public/index', { user: username});
        }
        else{
          console.log("find user: go to private index");
          username = decoded['userid'];
          res.render('private/index', { user: username});
        }
    });
  }
  else{
    console.log("no cookie: go to public index");
    res.render('public/index', { user: username});
  }

});

// go to detail page
app.get('/:id', function(req, res){
  console.log("go to detail page");
  var id = req.params.id;

  var username;
  if(req.cookies.token != undefined){
    console.log("have cookie");
    var token = req.cookies.token;
    var decoded = jwt.decode(token, JWT_SECRET);
    model.User.findOne(
      {username: decoded['userid'], password: decoded['passwd']},
      function(err, user){
        if(err){
          console.log("err in find user: go to public index");
          res.render('public/detailMC', {user: username, id: id});
        }
        if(user == null){
          console.log("user not found: go to public index");
          res.render('public/detailMC', {user: username, id: id});
        }
        else{
          console.log("find user: go to private index");
          username = decoded['userid'];
          res.render('private/detailMCforprivate', {user: username, id: id});
        }
    });
  }
  else{
    console.log("no cookie: go to public index");
    res.render('public/detailMC', {user: username, id: id});
  }

  // res.render('private/detailMCforprivate', {id: id});
});

app.listen(8080);
console.log('8080 is the magic port');
