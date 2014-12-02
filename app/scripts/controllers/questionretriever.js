'use strict';

angular.module('stackOverTubeApp').controller('QuestionRetrieverCtrl', function ($scope, $stateParams, $http, $sce){

  
    var getBody = function () {
      $scope.questionId = $stateParams.questionId;
      return $http.get('https://overtube-backend.herokuapp.com/question/'+ $scope.questionId).then(function(response1) {
        $scope.question = response1.data.question;
        console.log(response1.data)
        $scope.replies = $sce.getTrustedJs(response1.data.reply);
        // $scope.replies = response1.data.reply;
        console.log(response1.data.reply)
        // return $http.get('https://overtube-backend.herokuapp.com/user/'+ response1.data.question.UserId).then(function(err, response2) {
        //   if(err) {
        //     $scope.user = {name: "No user"}
        //   } else {
        //     $scope.user = response2.data
        //   };
        });
      // });
    };
    getBody()
});