/**
 * @ngdoc object
 * @name app.table-mgmt
 * @module app
 * @requires app.offer-mgmt
 * @requires app.sales-mgmt
 * @requires app.main
 * @requires table-mgmt.templates
 */
angular.module('app.table-mgmt', ['app.offer-mgmt', 'app.sales-mgmt', 'app.main', 'app.table-mgmt.templates'], function ($stateProvider, oaspTranslationProvider) {
    'use strict';
    oaspTranslationProvider.enableTranslationForModule('table-mgmt');

    $stateProvider.state('tableMgmt', {
        abstract: true,
        url: '/table-mgmt',
        template: '<ui-view/>'
    });

    $stateProvider.state('tableMgmt.search', {
        url: '/table-search',
        templateUrl: 'table-mgmt/table-search/table-search.html',
        controller: 'TableSearchCntl',
        controllerAs: 'TSC',
        resolve: {
            paginatedTableList: ['tables', function (tables) {
                return tables.getPaginatedTables(1, 4).then(function (paginatedTables) {
                    return paginatedTables;
                });
            }]
        }
    });

    $stateProvider.state('tableMgmt.details', {
        url: '/table-details/:tableId',
        templateUrl: 'table-mgmt/table-details/table-details.html',
        controller: 'TableDetailsCntl',
        controllerAs: 'TDC'
    });


    // @author Oliver Neff
    $stateProvider.state('tableMgmt.orders', {
        url: '/table-orders',
        templateUrl: 'table-mgmt/table-orders/table-orders.tpl.html',
        controller: 'TableOrdersCntl',
        controllerAs: 'TOC',
        resolve: {
            paginatedTableList: ['tables', function (tables) {
                return tables.getPaginatedTables(1, 999).then(function (paginatedTables) {
                    return paginatedTables;
                });
            }]
        }
    });


    $stateProvider.state('tableMgmt.overview', {
        url: '/table-overview',
        templateUrl: 'table-mgmt/table-overview/table-overview.tpl.html',
        controller: 'TableOverviewCntl',
        controllerAs: 'TOV',
        resolve: {
            paginatedTableList: ['tables', function (tables) {
                return tables.getPaginatedTables(1, 999).then(function (paginatedTables) {
                    return paginatedTables;
                });

            }],

            reservations: ['tables', function (tables) {
                return tables.loadReservations();
            }]

        }
    });


});
