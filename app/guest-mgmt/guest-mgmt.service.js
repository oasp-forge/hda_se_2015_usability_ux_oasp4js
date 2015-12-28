angular.module('app.guest-mgmt').factory('menu', function (guestManagementRestService) {
    'use strict';
    var shoppingCart = [];

    return {

        loadAllArticles: function () {
            return guestManagementRestService.getAllArticles().then(function (response) {
                return response.data;
            });

        },
        loadDrinkCategory: function () {
            return guestManagementRestService.getAllArticles().then(function (response) {
                return response.data;
            });

        },

        addToCart: function (article) {
            shoppingCart.push(article);
        },
        getCart: function () {
            return shoppingCart;
        },
        getAmount: function () {
            return shoppingCart.length;
        },
        getSum: function () {
            var sum = 0;

            for (var i = 0; i < shoppingCart.length; i++) {
                sum += parseFloat(shoppingCart[i].Price);

            }
            return sum;
        },
        removeFromCart: function (item) {
            for (var i = shoppingCart.length - 1; i >= 0; i--) {
                if (i === item) {
                    shoppingCart.splice(i, 1);
                }
            }
        }


    }
});

