angular.module('app.guest-mgmt')
    .controller('GuestDrinksCntl', function ($scope, menu, $modal,$filter) {
        'use strict';
        $scope.number = menu.getDrinkCartAmount();
        $scope.pageStart = 0;
        $scope.pageEnd = 6;
        $scope.itemsPerPage = 6;
        $scope.currentPage = 1;

        menu.loadAllArticles()
            .then(function (response) {
                $scope.drinks = $filter('category')(response.articles, '0');
                $scope.totalItems = $scope.drinks.length;
            });


        $scope.changePage = function () {

            $scope.pageStart = $scope.itemsPerPage * ($scope.currentPage - 1);
            $scope.pageEnd = $scope.pageStart + $scope.itemsPerPage;

        };


        $scope.add = function (res) {
            menu.addToDrinkCart(res);
            $scope.number = menu.getDrinkCartAmount();

        };

        $scope.cart = function (size) {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'guest-mgmt/guest-drinkcart/guest-drinkcart.tpl.html',
                controller: 'GuestDrinkCartCntl',
                size: "lg",
                resolve: {
                    items: function () {
                        return menu.getDrinkCart();
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.number = menu.getDrinkCartAmount();
            });
        };

        $scope.selecteditem = {};

        $scope.someFunction = function (item, model) {
            $scope.filterType = item.Type;
            var temp = $filter('filter')($scope.drinks, $scope.filterType);
            $scope.totalItems = temp.length;
        }

        $scope.clear = function () {
            $scope.filterType = undefined;
            $scope.selecteditem.selected = undefined;
            $scope.totalItems = $scope.drinks.length;

        };


    });

