'use strict';

angular.module('stackOverTubeApp').controller('AllquestionsCtrl', function ($scope,$http) {

  var getQuestions = function () {
    return $http.get('https://overtube-backend.herokuapp.com/allquestions').then(function(response) {
      $scope.questions = response.data;
    return response;
   })
  };

  $scope.test = 11// only to verify test tools are linked, needs to be deleted

  $scope.sortorder = '-views'

  getQuestions();

  $scope.upVoteQuestion = function(question) {
    question.votes++;
  };

  $scope.upViewQuestion = function(question) {
    question.views++;
  };
});

