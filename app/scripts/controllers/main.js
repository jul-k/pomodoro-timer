'use strict';

/**
 * @ngdoc function
 * @name pomodoroApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pomodoroApp
 */

var app = angular.module('pomodoroApp');

app.constant("$moment", moment);

app.controller('MainCtrl',  ['$scope', '$timeout', function($scope, $timeout) {

    $scope.workTime = 25;
    $scope.breakTime = 5;
    $scope.running = false;
    $scope.counter = $scope.workTime * 60;
    $scope.breakCounter = $scope.breakTime * 60;

    var stopped;

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
        $scope.breakCounter = $scope.breakTime * 60;
    }

    $scope.minusBreakTime = function() {
        if($scope.breakTime > 1) {
            $scope.breakTime = $scope.breakTime - 1;
            $scope.breakCounter = $scope.breakTime * 60;
        } else {
            $scope.breakTime = 1;
        }
    }

    $scope.countdown = function() {
        if($scope.counter >= 1) {
            stopped = $timeout(function() {
                console.log($scope.counter);
                $scope.counter--;
                $scope.countdown();
            }, 1000);
        } else {
            $scope.running = false;
        }
    }

    $scope.stop = function() {
        $timeout.cancel(stopped);
        $scope.running = false;
    }

    $scope.startCountDown = function() {
        if ($scope.running === true) {
            return;
        }
        $scope.running = true;
        $scope.countdown();
    }

    $scope.toggleCounter = function() {
        if ($scope.running) {
            $scope.stop();
        } else {
            $scope.startCountDown();
        }
    }

    $scope.$watch('workTime', function() {
       $scope.counter = $scope.workTime * 60;
    });

}]);

app.filter('asMinutes', ['$moment', function($moment) {
    return function(seconds) {
        return $moment.utc(seconds * 1000).format("mm:ss")
    };
}])
