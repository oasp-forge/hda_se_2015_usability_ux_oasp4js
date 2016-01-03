angular.module('app.guest-mgmt')
    .controller('GuestWelcomeCntl', function ($scope, $state, menu) {
        'use strict';

        $scope.alerts = menu.getAlerts();


    });
