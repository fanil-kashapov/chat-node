var app = angular.module('chatApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.auth.$requireAuth().then(function(auth){
              $state.go('channels');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('login', {
        requireNoAuth: function ($state, Auth) {
          return Auth.auth.$requireAuth().then(function (auth) {
            $state.go('home')
          }, function (error) {
            return
          })
        },
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'views/login.html'
      })

