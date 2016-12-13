'use strict';
//import './../node_modules/jquery';
import './../node_modules/angular';

import './../node_modules/angular-ui-router';
import angularBootstrapNpm from './../node_modules/angular-bootstrap-npm';
import './../node_modules/satellizer';
import './../node_modules/angular-socket-io';

import controllers from './app/controllers/controllers.injector';

import services from './app/services/services.injector';

import filters from './app/filters/filters.injector';

import ImgApi from './app/directives/imgapi';

var moduleName = 'chatApp';

var app = angular.module(moduleName, ['ui.router', 'satellizer', 'btford.socket-io', angularBootstrapNpm, services, filters, controllers, 'ngImgCrop']);
angular.module(moduleName).directive('imgApi', () => new ImgApi());

app.config(function($stateProvider, $authProvider, $urlRouterProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $authProvider.facebook({
        clientId: '1765321937087529',
        name: 'facebook',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 }
    });

    // Google
    $authProvider.google({
        clientId: '907807942179-s6b7sq76rfh8fuusc7pc591mab90v3i7.apps.googleusercontent.com',
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 452, height: 633 }
    });

    // Twitter
    $authProvider.twitter({
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri: window.location.origin,
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
    });

    $authProvider.linkedin({
        clientId: '77m72mf8cl4ico',
        url: '/auth/linkedin',
        authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
        redirectUri: window.location.origin,
        requiredUrlParams: ['state'],
        scope: ['r_emailaddress'],
        scopeDelimiter: ' ',
        state: 'STATE',
        oauthType: '2.0',
        popupOptions: { width: 527, height: 582 }
    });

    // GitHub
    $authProvider.github({
        clientId: 'a0734a58018aedc149c2',
        url: '/auth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        redirectUri: window.location.origin,
        optionalUrlParams: ['scope'],
        scope: ['user:email'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 1020, height: 618 }
    });

    $stateProvider
        .state('/', {
            controller: 'ChatCtrl',
            controllerAs: 'chatCtrl',
            url: '/',
            templateUrl: '../src/app/templates/tpl-chat.html',
            onEnter: ['$state', '$auth', function($state, $auth) {
                if (!$auth.isAuthenticated())
                    $state.go('singin');
            }]
        })
        .state('singin', {
            url: '/singin',
            controller: 'AuthCtrl',
            controllerAs: 'authCtrl',
            templateUrl: '../src/app/templates/tpl-singin.html'
        });

    $urlRouterProvider.otherwise('/');
});