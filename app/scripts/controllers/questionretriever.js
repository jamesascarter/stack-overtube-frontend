'use strict';

angular.module('stackOverTubeApp').controller('QuestionRetrieverCtrl', function ($scope, $stateParams, $http){

  $scope.questionId = $stateParams.questionId
    var getBody = function () {
      return $http.get('app/data/questions.json').then(function(response) {
        $scope.question = response.data[$stateParams.questionId -1]
      });
    };
    getBody()
});