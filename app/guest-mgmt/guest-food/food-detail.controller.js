angular.module('app.guest-mgmt')
    .controller('GuestFoodDetailCntl', function ($scope, menu, $modalInstance, items) {
        'use strict';

        $scope.food = items;
        $scope.marker = 0;

        $scope.highlight = function(element){
            $scope.food.SideDish = element;

            $scope.marker = element
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.add = function (food) {
            menu.addToFoodCart(food);
            $modalInstance.close();
        };

    });
