(function () {
    'use strict';
    angular.module("dealerApp").controller('loadDrylogsController',
        ['$scope', '$state', 'StandingDryLogfactory', '$location', 'DryLogSearchfactory', 'StandingDryLogService', 'ShareData',
        function ($scope, $state, StandingDryLogfactory, $location, DryLogSearchfactory, StandingDryLogService, ShareData, $event, ModalService, Excel, $timeout) {
            $scope.StandingDryLogsItems="";
            $scope.isSearching = false;
            $scope.page = 0;
            $scope.pagesCount = 0;
            $scope.editIssue = function (item) {
                alert(item.IDInstance);
                ShareData.value = item.IDInstance;
                alert(ShareData.value);
                $state.go('/editIssue');
                //$location.path("/editIssue");
            };

            $scope.sUserId = "";
            $scope.sTankID = "";
            $scope.sSOCID = "";
            $scope.sProductID = "";
            $scope.sRequestStatusID = "";
            $scope.sOutletNo = "";
            $scope.sDryDateFrom = "";
            $scope.sDryDateTo = "";


            $scope.exportToExcel = function (tableId) { // ex: '#my-table'

                var exportHref = Excel.tableToExcel(tableId, 'sheet name');
                $timeout(function () { location.href = exportHref; }, 100); // trigger download
            };

            $scope.IssueSearchLists = DryLogSearchfactory.query();
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                initDate: new Date('01-01-1900')
            };


            $scope.exportData = function () {
                var blob = new Blob([document.getElementById('table1').innerHTML], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "Report.xls");
            };

            $scope.search = function (page) {
                page = page || 0;
                var _onSuccess = function (value) {
                    $scope.page = value.Page;
                    $scope.pagesCount = value.TotalPages;
                    $scope.totalCount = value.TotalCount;
                    $scope.Data = value;
                    $scope.isSearching = false;
                };
                var _onError = function () {
                    $scope.isSearching = false;
                };
                $scope.isSearching = true;

                StandingDryLogfactory.query({ page: page, pageSize: 10 },
                    _onSuccess,
                    _onError);
            };
            $scope.search();
            $scope.calendar = {
                opened: {},
                dateFormat: 'MM/dd/yyyy',
                dateOptions: {},
                open: function ($event, which) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.calendar.opened[which] = true;
                }
            };
            //////Div show or hide 
            $scope.mainGridDiv = 'true';
            
            $scope.searchDiv = 'false';
           
            ///////
            $scope.isOpen = 'false';

            $scope.openCalendar = function (e) {
                e.preventDefault();
                e.stopPropagation();
                $scope.isOpen = true;
            };
            $scope.IssueSearchResults = null;

            $scope.searchStandingDry = function () {
                selectSearchRecords($scope.sUserId, $scope.sTankID, $scope.sSOCID, $scope.sProductID, $scope.sRequestStatusID, $scope.sOutletNo, $scope.sDryDateFrom, $scope.sDryDateTo);
            };

            function selectSearchRecords(UserId, TankID, SOCID, ProductID, RequestStatusID, OutletNo, DryDateFrom, DryDateTo) {
              
                $scope.Data = null;
                $scope.mainGridDiv = 'false';
                $scope.searchDiv = 'true';


                $http.get('/api/StandingDryLog/FetchIssues/',
                    {
                        params:
                        {
                            UserId: UserId,
                            IDTank: TankID,
                            IDSoc: SOCID,
                            IDProduct: ProductID,
                            IDRequestStatus: RequestStatusID,
                            OutletNo: OutletNo,
                           DateDryFrom: DryDateFrom,
                            DateDryTo: DryDateTo
                            
                      }
                    }).success(function (data) {
                        $scope.IssueSearchResults = data;
                })
                    .error(function () {
                        $scope.error = "An Error has occured while loading posts!";

                   });
            }


        }]);


}());