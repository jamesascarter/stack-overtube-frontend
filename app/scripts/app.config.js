'use strict';

angular.module('stackOverTubeApp').config(['$urlRouterProvider', '$stateProvider', '$sceProvider', function($urlRouterProvider, $stateProvider, $sceProvider) {

  $sceProvider.enabled(false);
  $urlRouterProvider.otherwise('/');


  $stateProvider

  .state('questions', {
    url: '/questions',
    templateUrl: 'app/views/allquestions.html'
  })

  .state('askquestion', {
    url: '/askquestion',
    templateUrl: 'app/views/askquestion.html'
  })

  .state('tags', {
    url: '/tags',
    templateUrl: 'app/views/tags.html'
  })

  .state('allvideos', {
    url: '/allvideos',
    templateUrl: 'app/views/allvideos.html'
  })

   .state('unanswered', {
    url: '/unanswered',
    templateUrl: 'app/views/unanswered.html'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'app/views/register.html'
  })

  .state('aboutus', {
    url: '/aboutus',
    templateUrl: 'app/views/aboutus.html'
  })

  .state('question', {
    url: '/question/:questionId',
    templateUrl: 'app/views/question.html',
    controller: 'QuestionRetrieverCtrl'
  });

}]);