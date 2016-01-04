angular.module('app.guest-mgmt')
    .controller('GuestFoodCartCntl', function ($scope, $modalInstance, menu, items,$modal, sales) {
        'use strict';

        $scope.items = items;
        $scope.amount = menu.getFoodCartAmount();
        $scope.sum = menu.getFoodCartSum();
        $scope.alerts = [];

        var tdcSelf = this;
        tdcSelf.model = {};
        tdcSelf.totalItems = 0;
        $scope.tableId = "104"


        sales.loadOrderForTable($scope.tableId)
            .then(function (order) {
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
                menu.clearFoodCart();
                $scope.items = [];
                $scope.alerts.push({
                    header: "Ihre Bestellung wurde erfolgreich durchgeführt!",
                    msg: "Falls Sie Fragen oder Änderungswünsche zu Ihrere Bestellung haben, wenden Sie sich bitte an einen Kellner.",
                    type: 'success'
                });
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
