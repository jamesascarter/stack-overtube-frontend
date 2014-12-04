'use strict';

angular.module('stackOverTubeApp').controller('UnansweredquestionsCtrl', function ($scope,$http, $location) {

  var getQuestions = function () {
    return $http.get('https://overtube-backend.herokuapp.com/allquestions').then(function(response1) {
      var q = response1.data;
      var arr = [];
      for(var i = 0; i < q.length; i++){
        $http.get('https://overtube-backend.herokuapp.com/question/'+q[i].id).then(function(response2){
          if(response2.data.reply.length === 0) {
            arr.push(response2.data.question);
            return $scope.questions = arr;
          }
        });
      }
   });
  };

  $scope.sortorder = '-views'

  getQuestions();

  $scope.upVoteQuestion = function(question) {
    return $http.post('https://overtube-backend.herokuapp.com/upquestionvotes/'+ question.id).then(function(err, response) {
       question.votes++;
    });
  };

  $scope.upViewQuestion = function(question) {
    question.views++;
  };
});