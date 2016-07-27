var app = angular.module('chatApp', ['ui.router', 'satellizer'])
  .config(function ($stateProvider, $authProvider) {
      $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'tpl-home',
          controller: 'ChatCtrl as chatCtrl'
      })
      .state('singin', {
          url: '/login',
          controller: 'AuthCtrl as authCtrl',
          templateUrl: 'tpl-singin'
      });
  });

