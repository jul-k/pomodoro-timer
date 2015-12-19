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

app.factory('SettingsStorage', ['localStorageService', function(localStorageService) {
    var defaults = {
        'work': 25,
        'break': 5
    }

    var self = {};

    self.getByLabel = function(labelName) {
        var val = localStorageService.get(labelName);
        return val || defaults[labelName]
    }

    self.setValue = function(labelName, value) {
        localStorageService.set(labelName, value)
    }
    return self

}])

app.controller('MainCtrl',  ['$scope', '$timeout', '$location', 'SettingsStorage', function($scope, $timeout, $location, SettingsStorage) {

    $scope.label = 'work';
    $scope.startingTime = SettingsStorage.getByLabel($scope.label);

    $scope.Init = function(labelName) {
        $scope.label = labelName;
        $scope.startingTime = SettingsStorage.getByLabel(labelName);
    }

    $scope.$watch('startingTime', function() {
        SettingsStorage.setValue($scope.label, $scope.startingTime)
        $scope.counter = $scope.startingTime * 60;
    }, true);

    $scope.running = false;
    $scope.counter = $scope.startingTime * 60;
    $scope.fillHeight = '0%';
    $scope.fillColor = '#787878';

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
        if ($scope.startingTime > 1) {
            $scope.startingTime = $scope.startingTime - 1;
        } else {
            $scope.startingTime = 1;
        }
    }

    $scope.countdown = function() {
        if ($scope.counter >= 1) {
            stopped = $timeout(function() {
                console.log($scope.counter);
                $scope.counter--;
                $scope.countdown();
            }, 1000);
        } else {
            $scope.running = false;
            notifyMe('Time is out! ;-)');

            $timeout(function() {
                $location.path($scope.nextPath || "/break");
            }, 2000);
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
        $scope.fillColor = '#A20404';
        if ($scope.running) {
            $scope.stop();
        } else {
            $scope.startCountDown();
        }
    }

    $scope.$watch('counter', function() {
        var perc = Math.abs((($scope.startingTime * 60 - $scope.counter) / ($scope.startingTime * 60)) * 100);
        $scope.fillHeight = perc + '%';
    });

}]);

app.filter('asMinutes', ['$moment', function($moment) {
    return function(seconds) {
        return $moment.utc(seconds * 1000).format("mm:ss")
    };
}])
