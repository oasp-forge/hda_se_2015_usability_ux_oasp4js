angular.module('app.guest-mgmt')
.controller('GuestFoodCntl',function($scope, menu, $modal,$filter){
    'use strict';
    $scope.number = menu.getFoodCartAmount();
    $scope.pageStart = 0;
    $scope.pageEnd = 6;
    $scope.itemsPerPage = 6;
    $scope.currentPage = 1;

    menu.loadAllArticles()
        .then(function (response) {
            $scope.foods = $filter('category')(response.articles, '1');
            $scope.totalItems = $scope.foods.length;
        });

    $scope.changePage = function () {
        $scope.pageStart = $scope.itemsPerPage * ($scope.currentPage-1);
        $scope.pageEnd = $scope.pageStart + $scope.itemsPerPage;
    };



    $scope.add = function (res) {
        menu.addToFoodCart(angular.copy(res));
        $scope.number = menu.getFoodCartAmount();

    };

    $scope.cart = function (size) {

        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'guest-mgmt/guest-FoodCart/guest-foodcart.tpl.html',
            controller: 'GuestFoodCartCntl',
            size: "lg",
            resolve: {
                items: function () {
                    return menu.getFoodCart();
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.number = menu.getFoodCartAmount();
        });
    };
    $scope.detail = function (food) {

        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'guest-mgmt/guest-food/detail.tpl.html',
            controller: 'GuestFoodDetailCntl',
            size: "lg",
            resolve: {
                items: function () {
                    return angular.copy(food);
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.number = menu.getFoodCartAmount();
        });
    };

    $scope.selecteditem = {};

    $scope.someFunction = function (item, model) {
        $scope.filterType = item.Type;
        var temp = $filter('filter')($scope.foods,$scope.filterType);
        $scope.totalItems = temp.length;


    }

    $scope.searchChange = function (){
        var temp = $filter('filter')($scope.foods, $scope.search);
        $scope.totalItems = temp.length;

    };

    $scope.clear = function () {
        $scope.filterType = undefined;
        $scope.selecteditem.selected = undefined;
        $scope.totalItems = $scope.foods.length;

    };


});
