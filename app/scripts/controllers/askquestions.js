'use strict';

app.controller('AskquestionsCtrl', function ($scope, $http, $location) {

  $scope.addQuestion = function () {

if ($scope.myform.$valid) {

    console.log($scope.title);
    console.log($scope.description);
    console.log($scope.codesnippet);
    console.log($scope.github);
    var url = "https://overtube-backend.herokuapp.com/askquestion";
    var question = {
          					title: $scope.title,
          					description: $scope.description,
          					codeSnippet: $scope.codesnippet,
          					githubRepo: $scope.github,
                    author: ''
    					    };
    $http.post(url, question).then(function() {
  		alert("Question posted!");
      $location.path('/questions');
    });    
}
  else {
    console.log("Form not valid");
    }
  };
});