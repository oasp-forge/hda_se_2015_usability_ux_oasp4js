angular.module('app.guest-mgmt')
    .controller('GuestBookCntl', function ($scope, menu, $state) {
        'use strict';

        $scope.user = menu.getBooking();


        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.user.date = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];

        $scope.status = {
            opened: false
        };

        $scope.book = function () {
           menu.saveBookingForConfirmation($scope.user);
            $state.go('guestMgmt.confirm');

        }





    });
