angular.module('app.guest-mgmt')
    .controller('GuestDrinkCartCntl', function ($scope, $modalInstance, menu, items, sales) {
        'use strict';

        $scope.items = items;
        $scope.amount = menu.getDrinkCartAmount();
        $scope.sum = menu.getDrinkCartSum();

        $scope.alerts = [];
        $scope.order = []
        $scope.id = 1;

        var tdcSelf = this;
        tdcSelf.model = {};
        tdcSelf.totalItems = 0;

        $scope.tableId = "104"
        $scope.totalItems;


        sales.loadOrderForTable($scope.tableId)
            .then(function (order) {
                console.log(order);
                tdcSelf.model.order = order;
                tdcSelf.totalItems = angular.isDefined(order) ? tdcSelf.model.order.positions.length : 0;
            });

        $scope.ok = function () {


            if (!tdcSelf.model.order) {

                tdcSelf.model.order = {
                    order: {
                        tableId: $scope.tableId,
                        state: 'OPEN'
                    },
                    positions: []
                };
            }
            angular.forEach($scope.items, function (item) {
                tdcSelf.model.order.positions.push({
                    comment: "",
                    offerId: 1,
                    offerName: item.Name,
                    orderId: tdcSelf.model.order.order.id,
                    price: item.Price,
                    revision: null,
                    state: "ORDERED"
                });
            });
            tdcSelf.totalItems = tdcSelf.model.order.positions.length;

            sales.saveOrUpdateOrder(tdcSelf.model.order).then(function () {
                menu.clearDrinkCart();
                $scope.items = [];
                $scope.alerts.push({
                    header: "Ihre Bestellung wurde erfolgreich durchgeführt!",
                    msg: "Falls Sie Fragen oder Änderungswünsche zu Ihrere Bestellung haben, wenden Sie sich bitte an einen Kellner.",
                    type: 'success'
                });
            });
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
