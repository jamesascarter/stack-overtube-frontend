'use strict';

angular.module('stackOverTubeApp').controller('AllquestionsCtrl', function ($scope,$http, $location) {

  var getQuestions = function () {
    return $http.get('https://overtube-backend.herokuapp.com/allquestions').then(function(response) {
      $scope.questions = response.data;
    return response;
   })
  };

  $scope.sortorder = '-views'

  getQuestions();

  $scope.upVoteQuestion = function(question) {
    // return question.votes++;
    return $http.post('https://overtube-backend.herokuapp.com/upquestionvotes/'+ question.id).then(function(err, response) {
       question.votes++;
    });
  };

  $scope.upViewQuestion = function(question) {
    question.views++;
  };

});

