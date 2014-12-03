'use strict';


var app = angular

  .module('stackOverTubeApp', ['ui.router', 'ngSanitize']);


app.run(function($rootScope) {

   $rootScope.$on('$stateChangeStart', function(scope,state) {
     if (state && state.name)
       $rootScope.controller = state.name;
   })
});
