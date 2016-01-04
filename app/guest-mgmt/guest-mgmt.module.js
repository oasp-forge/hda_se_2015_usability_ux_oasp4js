/**
 * @ngdoc object
 * @name app.table-mgmt
 * @module app
 * @requires app.offer-mgmt
 * @requires app.sales-mgmt
 * @requires app.main
 * @requires table-mgmt.templates
 */
angular.module('app.guest-mgmt', ['app.main', 'app.sales-mgmt'])
    .config(function ($stateProvider) {
        'use strict';

        $stateProvider
            .state('guestMgmt', {
                abstract: true,
                url: '/guest-mgmt',
                template: '<ui-view/>'
            });
        $stateProvider
            .state('guestMgmt.welcome', {
                url: '/guest-welcome',
                templateUrl: 'guest-mgmt/guest-welcome/guest-welcome.tpl.html',
                controller: 'GuestWelcomeCntl',
                controllerAs: 'GWC'
            });
        $stateProvider
            .state('guestMgmt.book', {
                url: '/guest-book',
                templateUrl: 'guest-mgmt/guest-book/guest-book.tpl.html',
                controller: 'GuestBookCntl',
                controllerAs: 'GBC'
            });
        $stateProvider
            .state('guestMgmt.confirm', {
                url: '/guest-book',
                templateUrl: 'guest-mgmt/guest-confirm/guest-confirm.tpl.html',
                controller: 'GuestBookConfirmCntl',
                controllerAs: 'GBCC'
            });
        $stateProvider
            .state('guestMgmt.overview', {
                url: '/guest-overview',
                templateUrl: 'guest-mgmt/guest-overview/guest-overview.tpl.html',
                controller: 'GuestOverviewCntl',
                controllerAs: 'GOC'
            });
        $stateProvider
            .state('guestMgmt.food', {
                url: '/guest-food',
                templateUrl: 'guest-mgmt/guest-food/guest-food.tpl.html',
                controller: 'GuestFoodCntl',
                controllerAs: 'GFC'
            });
        $stateProvider
            .state('guestMgmt.drinks', {
                url: '/guest-drinks',
                templateUrl: 'guest-mgmt/guest-drinks/guest-drinks.tpl.html',
                controller: 'GuestDrinksCntl',
                controllerAs: 'GDC'
            });

    })
    .filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
    })
    .filter('category', function () {
    return function (collection, category) {
            var tempCollection = [];
                angular.forEach(collection, function (item) {
                    if (angular.equals(item.Category, category)) {
                        tempCollection.push(item);
                    }
                });
            return tempCollection;

    };
}).filter('slice', function () {
    return function (arr, start, end) {
        return arr.slice(start, end);
    };
});;
