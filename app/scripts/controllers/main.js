'use strict';

/**
 * @ngdoc function
 * @name pomodoroApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pomodoroApp
 */

var app = angular.module('pomodoroApp');

app.controller('MainCtrl',  ['$scope', function($scope) {

    $scope.workTime = 25;
    $scope.breakTime = 5;

    $scope.addWorkTime = function() {
        $scope.workTime = $scope.workTime + 1;
    }

    $scope.minusWorkTime = function() {
        if($scope.workTime > 1) {
            $scope.workTime = $scope.workTime - 1;
        } else {
            $scope.workTime = 1;
        }
    }

    $scope.addBreakTime = function() {
        $scope.breakTime = $scope.breakTime + 1;
    }

    $scope.minusBreakTime = function() {
        if($scope.breakTime > 1) {
            $scope.breakTime = $scope.breakTime - 1;
        } else {
            $scope.breakTime = 1;
        }
    }

    $scope.countDown = function() {

    }

}]);

app.filter('minutesToDateTime', [function() {
    return function(minutes) {
        return new Date(1970, 0, 1).setMinutes(minutes);
    };
}])
