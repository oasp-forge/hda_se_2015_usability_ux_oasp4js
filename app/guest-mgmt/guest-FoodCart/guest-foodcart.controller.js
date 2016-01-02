angular.module('app.guest-mgmt')
    .controller('GuestFoodCartCntl', function ($scope, $modalInstance, menu, items,$modal) {
        'use strict';

        $scope.items = items;
        $scope.amount = menu.getFoodCartAmount();
        $scope.sum = menu.getFoodCartSum();
        $scope.alerts = [];

        $scope.ok = function () {
            menu.clearFoodCart();
            $scope.items = [];
            $scope.alerts.push({
                header: "Ihre Bestellung wurde erfolgreich durchgeführt!",
                msg: "Falls Sie Fragen oder Änderungswünsche zu Ihrere Bestellung haben, wenden Sie sich bitte an einen Kellner.",
                type: 'success'
            });


            //$modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.close($scope.items)

        };

        $scope.edit = function (item,index) {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'guest-mgmt/guest-food/detail.tpl.html',
                controller: 'GuestFoodDetailCntl',
                size: "lg",
                resolve: {
                    items: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (editedItem) {
                  $scope.remove(index);
                  $scope.food = editedItem;
            });
        };

        $scope.remove = function (element) {
            menu.removeFromFoodCart(element);
            $scope.items = menu.getFoodCart();
            $scope.amount = menu.getFoodCartAmount();
            $scope.sum = menu.getFoodCartSum();


        };

    });
