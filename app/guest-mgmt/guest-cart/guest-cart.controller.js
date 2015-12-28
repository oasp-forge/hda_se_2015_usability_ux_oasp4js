angular.module('app.guest-mgmt')
    .controller('GuestCartCntl', function ($scope, $modalInstance, menu, items) {
        'use strict';

        $scope.drinks = items;
        $scope.amount = menu.getAmount();
        $scope.sum = menu.getSum();

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.close($scope.drinks)

        };

        $scope.remove =function (element){
            menu.removeFromCart(element);
            $scope.drinks = menu.getCart();
            $scope.amount = menu.getAmount();
            $scope.sum = menu.getSum();


        };

    });
