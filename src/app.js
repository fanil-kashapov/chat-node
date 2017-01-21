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

import AuthConfig from './auth.config.js';

var moduleName = 'chatApp';

var app = angular.module(moduleName, ['ui.router', 'satellizer', 'btford.socket-io', angularBootstrapNpm, services, filters, controllers, 'ngImgCrop']);
angular.module(moduleName).directive('imgApi', () => new ImgApi());

app.config(function($stateProvider, $authProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    AuthConfig.applyAuthSettings($authProvider);

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
            controller: 'ChatCtrl',
            controllerAs: 'chatCtrl',
            url: '/',
            templateUrl: '../src/app/templates/tpl-chat.html',
            onEnter: ['$state', '$auth', function($state, $auth) {
                if (!$auth.isAuthenticated()) {
                    $state.go('singin');
                }
            }]
        })
        .state('singin', {
            url: '/singin',
            controller: 'AuthCtrl',
            controllerAs: 'authCtrl',
            templateUrl: '../src/app/templates/tpl-singin.html'
        });


});