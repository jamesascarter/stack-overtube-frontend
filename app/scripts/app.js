'use strict';


var app = angular
  .module('stackOverTubeApp', ['ui.router', 'satellizer']);

app.config(function($authProvider) {

  $authProvider.github({
    clientId: '',
	  url: '/auth/github',
	  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
	  redirectUri:'http://127.0.0.1:3000/callback',
	  scope: [],
	  scopeDelimiter: ' ',
	  type: '2.0',
	  popupOptions: { width: 1020, height: 618 }
	});
		console.log(window.location.origin);
	  console.log(window.location.protocol + '//' + window.location.host)

});

