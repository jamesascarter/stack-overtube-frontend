'use strict';

angular.module('stackOverTubeApp').controller('QuestionRetrieverCtrl', function ($scope, $stateParams, $http){

  $scope.questionId = $stateParams.questionId
    var getBody = function () {
      return $http.get('https://overtube-backend.herokuapp.com/question/'+ $scope.questionId).then(function(response) {
      	console.log(response)
        $scope.question = response.data.question
        console.log($scope.question);
      });
    };
    getBody()
});