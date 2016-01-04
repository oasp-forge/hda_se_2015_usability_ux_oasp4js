angular.module('app.guest-mgmt')
    .controller('GuestWelcomeCntl', function ($scope, $state, menu) {
        'use strict';

        $scope.alerts = menu.getAlerts();
        $scope.closeAlert = function (){
            $scope.alerts = undefined;
            menu.deleteAlerts();
        }


    });
