var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var path = require('path');



app.use(express.static(path.join(__dirname)));
app.listen(port);
app.set('views',__dirname + '/app')
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
console.log("Listening on port 3000");
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next();
});

app.get('/', function(req, res){
  res.render('index')
});

// app.post('/videos', function(req, res) {
// 	// console.log(req.body);
// 	// console.log(req.body.replies);
// 	var questionId = req.body.questionId;
// 	var video = req.body.replies[0];
// 	console.log(video.link);
	
// 	s3.getObject(({Bucket: 'stackovertubeTwo', Key: video.link}), function(err, data) {
// 		if (err) {
//       console.log("Error uploading data: ", err);
//     } else {
//       console.log(data.Body);
//       res.send(data.Body);
//     }
// 	});
	
// });
