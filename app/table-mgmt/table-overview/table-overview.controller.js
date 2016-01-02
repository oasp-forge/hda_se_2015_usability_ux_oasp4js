/**
 * Created by Oliver Neff on 01.01.2016.
 */
angular.module('app.table-mgmt')
    .controller('TableOverviewCntl', function ($scope, paginatedTableList) {
        'use strict';

        // Panels
        $scope.panelState = function(state) {
            if (state == 'OCCUPIED') {
                return 'panel-danger';
            }
            if (state == 'FREE') {
                return 'panel-success';
            }
            if (state == 'RESERVED') {
                return 'panel-warning';
            }
            return null;
        };

        $scope.setFree = function(table) {

        };

        $scope.setOccupy = function(table) {

        };

        // Pagination
        $scope.selectedItems = [];
        $scope.totalItems = paginatedTableList.pagination.total;
        $scope.numPerPage = paginatedTableList.pagination.size;
        $scope.currentPage = paginatedTableList.pagination.page;

        $scope.gridOptions = {
            data: paginatedTableList.result
        };

        $scope.reloadTables = function () {
            tables.getPaginatedTables($scope.currentPage, $scope.numPerPage).then(function (paginatedTables) {
                return paginatedTables;
            }).then(function (res) {
                paginatedTableList = res;
                $scope.gridOptions.data = paginatedTableList.result;
            });
        };

        $scope.$watch('currentPage', function () {
            $scope.reloadTables();
        });



});
