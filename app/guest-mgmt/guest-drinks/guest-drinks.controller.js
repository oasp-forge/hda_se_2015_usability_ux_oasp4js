angular.module('app.guest-mgmt')
    .controller('GuestDrinksCntl', function ($scope, menu, $modal) {
        'use strict';
        $scope.number = menu.getAmount();

        menu.loadAllArticles()
            .then(function (response) {
                $scope.drinks = response.articles;
            });

        $scope.add = function (res) {
            menu.addToCart(res);
            $scope.number = menu.getAmount();

        };

        $scope.cart = function (size) {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'guest-mgmt/guest-cart/guest-cart.tpl.html',
                controller: 'GuestCartCntl',
                size: "lg",
                resolve: {
                    items: function () {
                        return menu.getCart();
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.number = menu.getAmount();
            });
        };

        $scope.selecteditem = {};

        $scope.someFunction = function (item, model) {
            $scope.filterType = item.Type;
        }

        $scope.clear = function () {
            $scope.filterType = undefined;
            $scope.selecteditem.selected = undefined;

        };


    });

