angular.module('app.guest-mgmt')
    .controller('GuestDrinkCartCntl', function ($scope, $modalInstance, menu, items, sales,$http) {
        'use strict';

        $scope.items = items;
        $scope.amount = menu.getDrinkCartAmount();
        $scope.sum = menu.getDrinkCartSum();

        $scope.alerts = [];
        $scope.order = []
        $scope.id = 1;


        $scope.ok = function () {
            $scope.order = {
                "order": {
                    state: "OPEN",
                    tableId: 105
                },
                "positions": [{
                    comment: "",
                    offerId: 1,
                    offerName: "Schnitzel-Menü",
                    orderId: undefined,
                    price: "6.99",
                    revision: null,
                    state: "ORDERED"
                }]
            };

            sales.saveOrUpdateOrder($scope.order).then(function () {
                menu.clearDrinkCart();
                $scope.items = [];
                $scope.alerts.push({
                    header: "Ihre Bestellung wurde erfolgreich durchgeführt!",
                    msg: "Falls Sie Fragen oder Änderungswünsche zu Ihrere Bestellung haben, wenden Sie sich bitte an einen Kellner.",
                    type: 'success'
                });
            });

            //sales.saveOrUpdateOrder($scope.order);
            // $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.close($scope.items)

        };

        $scope.remove = function (element) {
            menu.removeFromDrinkCart(element);
            $scope.items = menu.getDrinkCart();
            $scope.amount = menu.getDrinkCartAmount();
            $scope.sum = menu.getDrinkCartSum();


        };

    })
;
