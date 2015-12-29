/**
 * @ngdoc object
 * @name app.offer-mgmt
 * @module app
 * @requires app.main
 */
angular.module('app.guest-mgmt', ['app.offer-mgmt', 'app.sales-mgmt', 'app.main', 'app.table-mgmt' ,'app.table-mgmt.templates']) , function ($stateProvider, oaspTranslationProvider) {
        'use strict';

         oaspTranslationProvider.enableTranslationForModule('guest-mgmt');

         $stateProvider.state('guestMgmt', {
             abstract: true,
             url: '/guest-mgmt',
             template: '<ui-view/>'
         });

         $stateProvider.state('guestMgmt.overview', {
             url: '/guest-mgmt/guest-overview',
             templateUrl: 'guest-mgmt/guest-overview/guest-overview.html',
             controller: 'GuestOverviewCntl',
             controllerAs: 'GOC',
         });
    }
