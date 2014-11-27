'use strict';

app.controller('RegisterCtrl', function ($scope, $http, $location) {

      $scope.register = function () {
        console.log($scope.firstName);
        console.log($scope.lastName);
        console.log($scope.username);
        console.log($scope.password);
        $location.path('/')
      };

  });