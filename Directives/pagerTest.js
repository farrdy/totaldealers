(function () {
    'use strict';

    angular
        .module('dealerApp')
        .directive('pagerTest', pagerTest);

    pagerTest.$inject = ['$window', 'StandingDryTestfactoryService'];

    function pagerTest($window, fullClubSvc) {
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "~/Scripts/App/Templates/pagerTest.html",
            scope: {
                totalPages: "=",
                currentPage: "=",
                pageAction: "&"
            }
        };

        return directive;

        function link(scope, element, attrs) {
            scope.IssueResult = [];
            scope.$watch('totalPages', function () {
                createPageArray(scope.IssueResult, scope.totalPages);
            });
            scope.gotoPage = function (p) {
                scope.pageAction({ pageNumber: p });
            };
        }

        function createPageArray(IssueResult, totalPages) {
            var i;
            IssueResult.length = 0;

            for (i = 1; i <= totalPages; i++) {
                IssueResult.push(i);
            }
        }
    }

})();