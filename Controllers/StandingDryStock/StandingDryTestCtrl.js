(function () {
    'use strict';

    angular
        .module('dealerApp')
        .controller('fullCtrl', fullCtrl);

    fullCtrl.$inject = ['$scope', 'StandingDryTestFactory'];

    function fullCtrl($scope, StandingDryTestFactory) {
        $scope.title = 'full paging';
        $scope.description = 'A fully paged list of clubs. The pager directive manages the page navigation. The fullClubService only loads a page when it clicked on for the first time';

        $scope.IssueResult = StandingDryTestFactory.IssueResult;
        $scope.info = StandingDryTestFactory.paging.info;
        $scope.options = StandingDryTestFactory.paging.options;

        $scope.navigate = navigate;
        $scope.clear = optionsChanged;

        $scope.status = {
            type: "info",
            message: "ready",
            busy: false
        };

        activate();

        function activate() {
            //if this is the first activation of the controller load the first page
            if (StandingDryTestFactory.paging.info.currentPage === 0) {
                navigate(1);
            }
        }

        function navigate(pageNumber) {
            $scope.status.busy = true;
            $scope.status.message = "loading records";

            StandingDryTestFactory.navigate(pageNumber)
                            .then(function () {
                                $scope.status.message = "ready";
                            }, function (result) {
                                $scope.status.message = "something went wrong: " + (result.error || result.statusText);
                            })
                            ['finally'](function () {
                                $scope.status.busy = false;
                            });
        }

        function optionsChanged() {
            StandingDryTestFactory.clear();
            activate();
        }
    }
})();