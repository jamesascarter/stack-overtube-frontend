'use strict';

app.controller('QuestionRetrieverCtrl', function ($scope, $stateParams, $http){

  $scope.questionId = $stateParams.questionId;
    var getBody = function () {
      return $http.get('https://overtube-backend.herokuapp.com/question/'+ $scope.questionId).then(function(response) {
        $scope.question = response.data.question;
        return $http.get('https://overtube-backend.herokuapp.com/user/'+ response.data.question.UserId).then(function(res) {
        	$scope.user = res.data;
        });
      });
    };
    getBody()
});