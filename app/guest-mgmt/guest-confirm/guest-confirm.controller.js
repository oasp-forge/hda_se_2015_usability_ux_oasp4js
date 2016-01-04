angular.module('app.guest-mgmt')
    .controller('GuestBookConfirmCntl', function ($scope, $state, menu) {
        'use strict';

        $scope.user = menu.getBooking()

        $scope.book = function () {
            var number = Math.floor( Math.random() * (99999 - 10000)+ 10000);
            var alert = {
                msg: "Ihre Reservierungsnummer lautet: "+number+". Bitte notieren Sie sich diese. Bei Stornierungen oder Rückfragen rufen Sie uns an.",
                header: "Reservierungs erfolgreich!",
                type:"success"
            }
            menu.setAlert(alert);
            $state.go("guestMgmt.welcome");
        }
    });
