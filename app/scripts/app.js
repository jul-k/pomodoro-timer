'use strict';

/**
 * @ngdoc overview
 * @name pomodoroApp
 * @description
 * # pomodoroApp
 *
 * Main module of the application.
 */
angular
  .module('pomodoroApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/break', {
        templateUrl: 'views/break.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
