'use strict';

app.controller('AskquestionsCtrl', function($scope, AskquestionService, $location) {

  $scope.addQuestion = function() {
    var question = {
                     title: $scope.title,
                     description: $scope.description, 
                     codeSnippet: $scope.codesnippet, 
                     githubRepo: $scope.github 
                    };
    AskquestionService.addQuestion(question);
    $location.path('/questions');
  }
});
