angular.module('app.guest-mgmt')
    .controller('GuestFoodDetailCntl', function ($scope, menu, $modalInstance, items) {
        'use strict';


        $scope.item = items;
        $scope.marker = items.SideDish



        $scope.highlight = function(element){
            $scope.item.SideDish =element;
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
