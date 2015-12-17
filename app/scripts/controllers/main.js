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

app.controller('MainCtrl',  ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {

    $scope.startingTime = 25;
    $scope.running = false;
    $scope.counter = $scope.startingTime * 60;

    var stopped;

    $scope.addMinute = function() {
        if ($scope.startingTime < 59) {
            $scope.startingTime = $scope.startingTime + 1;
        } else {
            alert("Don't forget about pomodoro technique! Set a little bit shorter interval. ;-)");
            $scope.startingTime = 59;
        }
    }

    $scope.minusMinute = function() {
        if($scope.startingTime > 1) {
            $scope.startingTime = $scope.startingTime - 1;
        } else {
            $scope.startingTime = 1;
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
            $location.path($scope.nextPath || "/break");
            notifyMe('Time is out! ;-)');
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

    $scope.$watch('startingTime', function() {
       $scope.counter = $scope.startingTime * 60;
    });

}]);

app.filter('asMinutes', ['$moment', function($moment) {
    return function(seconds) {
        return $moment.utc(seconds * 1000).format("mm:ss")
    };
}])
