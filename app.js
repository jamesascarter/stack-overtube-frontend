var express = require('express');
var port = process.env.PORT || 4000;
var app = express();
var http = require('http')
var path = require('path');
var config = require('./config');
var bodyParser = require('body-parser');
var request = require('request');
var qs = require('querystring');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.set('views',__dirname + '/app')
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next();
})

app.get('/', function(req, res){
  res.render('index')

})

app.listen(port, function serverLog(){
	console.log("Server running on " + port)
});

var counter = 0
//SATELLIZE CODE - MAY NEED REFACTORING - MAY NEED TO BE MOVED TO BACKEND
//SERVER
// console.log("hello");
app.post('/auth/github', function(req, res) {
  // console.log(req);
  // console.log("fucktard");
  counter += 1
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri
  };
  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    var headers = { 'User-Agent': 'Satellizer' };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {

      // Step 3a. Link user accounts.
      if (req.headers.authorization) {
        User.findOne({ github: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.github = profile.id;
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = createToken(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // console.log(profile)
        // console.log(profile.login)
        // console.log(gitprofile)
        var post_options = {
        host: 'localhost',
        port: '3000',
        path: '/gitlogin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': 6
      }
  };

        var gitprofile = {
            login: profile.login,
            githubid: profile.id
          };

        request.post('http://localhost:3000/gitlogin',
                    {form:{'githubid': profile.id,
                           'login': profile.login}},
                    function(err, body){
                       console.log(body.body)
                    })


        // request.post({
        //   headers: {'content-type' : 'application/x-www-form-urlencoded'},
        //   url:     'http://localhost:3000/gitlogin',
        //   formData:   {'profile': profile.id, 'name': profile.login}
        //   // json:    {'profile': profile.id, 'name': profile.login}
        // }, function(error, response, body){
        //   console.log(body)
        //   console.log(profile.id)
        //   console.log(profile.login)
        // });







        // YOU NEED TO IMPLEMENT A USER TO SAVE THIS INFORMATION - IF YOU WANT,
        // FOLLOW THE SATELLIZE EXAMPLES SCHEMA

        // Step 3b. Create a new user account or return an existing one.
        // User.findOne({ github: profile.id }, function(err, existingUser) {
        //   if (existingUser) {
        //     var token = createToken(existingUser);
        //     return res.send({ token: token });
        //   }
        //   var user = new User();
        //   user.github = profile.id;
        //   user.displayName = profile.name;
        //   user.save(function() {
        //     var token = createToken(user);
        //     res.send({ token: token });
        //   });
        // });
      }
    });
  });
});

