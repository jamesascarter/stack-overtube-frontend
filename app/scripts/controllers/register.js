'use strict';

// app.controller('RegisterCtrl', function ($scope, $http, $location) {

//       $scope.register = function () {
//         console.log($scope.firstName);
//         console.log($scope.lastName);
//         console.log($scope.username);
//         console.log($scope.password);
//         $location.path('/')
//       };

//   });

app.controller('LoginCtrl', function($scope, $auth) {

  $scope.login = function(provider) {
    $auth.authenticate(provider)
	    .then(function() {
	    $alert({
					    content: 'You have successfully logged in',
					    animation: 'fadeZoomFadeDown',
					    type: 'material',
					    duration: 3
	  				});
	  });
  };

	$scope.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};

	$scope.logout = function() {
		return $auth.logout()
	    .then(function() {
	      $alert({
				        content: 'You have been logged out',
				        animation: 'fadeZoomFadeDown',
				        type: 'material',
				        duration: 3
				      });
	  });
	};

});