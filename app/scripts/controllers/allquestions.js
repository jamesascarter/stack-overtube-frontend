'use strict';

angular.module('stackOverTubeApp').controller('AllquestionsCtrl', function ($scope,$http, $location) {

  var getQuestions = function () {
    return $http.get('https://overtube-backend.herokuapp.com/allquestions').then(function(response1) {
      $scope.questions = response1.data;
      $scope.allreplies = {};
      for(var i = 0; i < $scope.questions.length; i++){
        getReplies($scope.questions[i].id);  
      }
   });
  };

  var getReplies = function(questionId) {
    console.log("questionid", questionId)
    $http.get('https://overtube-backend.herokuapp.com/question/'+questionId).then(function(response2){
      console.log(response2.data)
          $scope.allreplies[questionId] = response2.data.reply.length;
    });
  };

  $scope.sortorder = '-views'

  getQuestions();

  $scope.upVoteQuestion = function(question) {
    return $http.post('https://overtube-backend.herokuapp.com/upquestionvotes/'+ question.id).then(function(err, res) {
      question.votes++;
    });
  };

  $scope.upViewQuestion = function(question) {
    return $http.post('https://overtube-backend.herokuapp.com/upquestionviews/'+ question.id).then(function(err, res) {
      question.views++;
    });
  }
});

