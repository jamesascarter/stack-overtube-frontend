'use strict';

app.factory('AskquestionService', function ($http) {

  return{
	  addQuestion: function(question) {
	  	console.log(question);
	  	var url = "https://overtube-backend.herokuapp.com/askquestion";
	  	$http.post(url, question)
	  	.success(function() {
	  		console.log("Question posted!");
	  	});
		}
	}
});