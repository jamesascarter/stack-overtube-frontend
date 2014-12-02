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
app.post('/auth/github', function(req, res) {

  counter += 1
  console.log(req)
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
      if (counter == 1) {
      request.post('http://localhost:3000/gitlogin',
                {form:{'githubid': profile.id,
                       'login': profile.login}},
                function(err, body){
                   console.log(body.body)
                }
      );
      };

    });
  });
});

