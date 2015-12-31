angular.module('app.guest-mgmt')
    .controller('GuestFoodCartCntl', function ($scope, $modalInstance, menu, items) {
        'use strict';

        $scope.items = items;
        $scope.amount = menu.getAmount();
        $scope.sum = menu.getSum();

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.close($scope.items)

        };

        $scope.remove = function (element) {
            menu.removeFromCart(element);
            $scope.items = menu.getCart();
            $scope.amount = menu.getAmount();
            $scope.sum = menu.getSum();


        };

    });
