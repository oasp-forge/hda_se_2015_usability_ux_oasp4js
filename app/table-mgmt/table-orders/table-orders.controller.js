/**
 * Created by Oliver Neff on 26.11.2015.
 */
angular.module('app.table-mgmt')
    .controller('TableOrdersCntl', function ($scope, tables, paginatedTableList, sales) {
        'use strict';
        // Sales
        $scope.model = [];

        $scope.ordered = function(tableNumber) {
            var positions = $scope.model[tableNumber].positions;
            return Object.keys(positions).length;
        };

        // Color for warning
        $scope.height = '100px';
        $scope.bgColor = 'red';

        // Sales
        $scope.salesOrdered = 0;
        $scope.salesPrepared = 0;
        $scope.salesDelivered = 0;

        // Pagination
        $scope.selectedItems = [];
        $scope.totalItems = paginatedTableList.pagination.total;
        $scope.numPerPage = paginatedTableList.pagination.size;
        $scope.currentPage = paginatedTableList.pagination.page;

        $scope.gridOptions = {
            data: paginatedTableList.result
        };


        $scope.load = function (tableID, index) {
            sales.loadOrderForTable(tableID)
                .then(function (order) {
                    $scope.model[index] = order;
                });
        };

        for (var i = 0; i < $scope.totalItems; i++) {
            var tableID = $scope.gridOptions.data[i].id;
            $scope.load(tableID, i);
        }


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
