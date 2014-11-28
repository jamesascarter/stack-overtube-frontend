'use strict';


var app = angular
.module('stackOverTubeApp', ['ui.router', 'satellizer']);

app.config(function($authProvider) {

  $authProvider.github({
   clientId: '',
    url: '/auth/github',
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    redirectUri: window.location.origin,
    scope: [],
    scopeDelimiter: ' ',
    type: '2.0',
    popupOptions: { width: 1020, height: 618 }
  });

});

