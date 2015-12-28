/**
 * @ngdoc object
 * @name app.table-mgmt
 * @module app
 * @requires app.offer-mgmt
 * @requires app.sales-mgmt
 * @requires app.main
 * @requires table-mgmt.templates
 */
angular.module('app.guest-mgmt', ['app.main'])
    .config(function ($stateProvider) {
        'use strict';

        $stateProvider
            .state('guestMgmt', {
                abstract: true,
                url: '/guest-mgmt',
                template: '<ui-view/>'
            })
            .state('guestMgmt.overview', {
                url: '/guest-overview',
                templateUrl: 'guest-mgmt/guest-overview/guest-overview.tpl.html',
                controller: 'GuestOverviewCntl',
                controllerAs: 'GOC'
            })


            .state('guestMgmt.drinks', {
                url: '/guest-drinks',
                templateUrl: 'guest-mgmt/guest-drinks/guest-drinks.tpl.html',
                controller: 'GuestDrinksCntl',
                controllerAs: 'GDC'
            });

    }).
    filter('unique', function () {
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
});
