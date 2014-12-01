'use strict';

app.factory('QuestionretrieverService', function ($http) {

  return{
	  getBody: function(questionId) {
	  	console.log(questionId);
	  	var url = "https://overtube-backend.herokuapp.com/";
	  	$http.get(url+'question/'+questionId).then(function(response1) {
	  		console.log(response1)
	  		var question = response1.data.question;
	  		$http.get(url+'user/'+ response1.data.question.userId).then(function(response2) {
        	var user = response2.data;
        	// return {question: question, user: user}
        });
	  	});
		}
	}
});
