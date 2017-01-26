'use strict';
//import './../node_modules/jquery';
import './../node_modules/angular';

import './../node_modules/angular-ui-router';
import angularBootstrapNpm from './../node_modules/angular-bootstrap-npm';
import './../node_modules/satellizer';
import './../node_modules/angular-socket-io';

import chat from './app/chat/chat.module';
import auth from './app/auth/auth.module';
import imgPopup from './app/imgapi/img.popup.module';
import authConfig from './app/auth/auth.config';

import imgapi from './app/imgapi/img.api.directive';

import services from './app/services/services.injector';

import filters from './app/filters/filters.injector';

var moduleName = 'chatApp';

var app = angular.module(moduleName, ['ui.router', 'satellizer', 'btford.socket-io', angularBootstrapNpm, chat, auth, imgPopup, services, filters, 'ngImgCrop']);
angular.module(moduleName).directive('imgApi', () => new imgapi());

app.config(($stateProvider, $authProvider, $urlRouterProvider, $locationProvider) => {
    //$locationProvider.html5Mode(true);
    authConfig.applyAuthSettings($authProvider);

    $stateProvider
        .state('/', {
            controller: 'ChatCtrl',
            controllerAs: 'chatCtrl',
            url: '/',
            templateUrl: '../src/app/chat/chat.tpl.html',
            onEnter: ['$state', '$auth', ($state, $auth) => {
                if (!$auth.isAuthenticated())
                    $state.go('auth');
            }]
        })
        .state('auth', {
            url: '/auth',
            controller: 'AuthCtrl',
            controllerAs: 'authCtrl',
            templateUrl: '../src/app/auth/auth.tpl.html'
        });
        
    $urlRouterProvider.otherwise('/');
});
