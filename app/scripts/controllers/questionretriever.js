'use strict';

angular.module('stackOverTubeApp').controller('QuestionRetrieverCtrl', function ($scope, $stateParams, $http, $sce){

  
    var getBody = function () {
      $scope.questionId = $stateParams.questionId;
      return $http.get('https://overtube-backend.herokuapp.com/question/'+ $scope.questionId).then(function(response1) {
        $scope.question = response1.data.question;
        $scope.replies = $sce.getTrustedJs(response1.data.reply);
        return $http.get('https://overtube-backend.herokuapp.com/user/'+ response1.data.question.UserId).then(function(response2) {
            if(response2.data.username === "") {
                $scope.username = "Anonymous"
            } else {
                $scope.username =  response2.data.username;
            }
        });
      });
    }
    getBody()
});