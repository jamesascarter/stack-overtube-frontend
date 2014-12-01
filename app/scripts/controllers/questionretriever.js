'use strict';

angular.module('stackOverTubeApp').controller('QuestionRetrieverCtrl', function ($scope, $stateParams, QuestionretrieverService){

  var getBody = function() {
    $scope.questionId = $stateParams.questionId;
    $scope.question = QuestionretrieverService.getBody($scope.questionId);
      console.log($scope.question);
    };
  getBody();
});