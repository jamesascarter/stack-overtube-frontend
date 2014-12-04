'use strict';

angular.module('stackOverTubeApp').controller('AllquestionsCtrl', function ($scope,$http, $location) {

  // var getQuestions = function () {
  //   return $http.get('https://overtube-backend.herokuapp.com/allquestions').then(function(response) {
  //     $scope.questions = response.data;
  //   return response;
  //  })
  // };



  var getQuestions = function () {
    return $http.get('https://overtube-backend.herokuapp.com/allquestions').then(function(response1) {
      $scope.questions = response1.data;
      var q = response1.data;
      var arr = [];
      for(var i = 0; i < q.length; i++){
        $http.get('https://overtube-backend.herokuapp.com/question/'+q[i].id).then(function(response2){
          arr.push(response2.data.reply.length)
            console.log(arr);
            return $scope.allreplies = arr;
        });
      }
   });
  };

  $scope.sortorder = '-views'

  getQuestions();

  $scope.upVoteQuestion = function(question) {
    // return question.votes++;
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

