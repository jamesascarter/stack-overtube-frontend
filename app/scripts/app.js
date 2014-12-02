'use strict';


var app = angular
.module('stackOverTubeApp', ['ui.router', 'satellizer']);

app.config(function($authProvider) {
  // console.log($authProvider);
  // console.log('app.jsssss');
  $authProvider.github({
   clientId: 'c601624f82fe9a29a57d',
    url: '/auth/github?',
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    redirectUri: window.location.origin + '/callback',
    scope: [],
    scopeDelimiter: ' ',
    type: '2.0',
    popupOptions: { width: 1020, height: 618 }
  }
  );

});

