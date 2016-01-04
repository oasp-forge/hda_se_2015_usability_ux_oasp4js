angular.module('app.guest-mgmt').factory('menu', function (guestManagementRestService) {
    'use strict';
    var DrinkCart = [];
    var FoodCart = [];
    var booking;
    var alert = [];

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
        addToDrinkCart: function (article) {
            DrinkCart.push(article);
        },
        getDrinkCart: function () {
            return DrinkCart;
        },
        getDrinkCartAmount: function () {
            return DrinkCart.length;
        },
        getDrinkCartSum: function () {
            var sum = 0;

            for (var i = 0; i < DrinkCart.length; i++) {
                sum += parseFloat(DrinkCart[i].Price);

            }
            return sum;
        },
        removeFromDrinkCart: function (item) {
            for (var i = DrinkCart.length - 1; i >= 0; i--) {
                if (i === item) {
                    DrinkCart.splice(i, 1);
                }
            }
        },

        clearDrinkCart: function (){
            DrinkCart = [];
        },
        addToFoodCart: function (article) {
            FoodCart.push(article);
        },
        getFoodCart: function () {
            return FoodCart;
        },
        getFoodCartAmount: function () {
            return FoodCart.length;
        },
        getFoodCartSum: function () {
            var sum = 0;

            for (var i = 0; i < FoodCart.length; i++) {
                sum += parseFloat(FoodCart[i].Price);

            }
            return sum;
        },
        removeFromFoodCart: function (item) {
            for (var i = FoodCart.length - 1; i >= 0; i--) {
                if (i === item) {
                    FoodCart.splice(i, 1);
                }
            }
        },

        clearFoodCart: function(){
            FoodCart = [];
        },

        saveBookingForConfirmation: function(bookData){
            booking = bookData
        },
        getBooking: function(){
            return booking;
        },
        setAlert: function(alerts){
            alert.push(alerts);
        },
        getAlerts: function(){
            return alert;
        },
        deleteAlerts: function(){
            alert = [];
        }


    }
});

