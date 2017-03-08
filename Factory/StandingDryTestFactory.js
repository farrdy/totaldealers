(function () {
    'use strict';

    angular
        .module('dealerApp')
        .factory('StandingDryTestfactoryService', StandingDryTestfactoryService);

    StandingDryTestfactoryService.$inject = ['$q', 'StandingDryGetAllService'];

    function StandingDryTestfactoryService($q, StandingDryGetAllService) {
        var initialOptions = {
            size: 4,
            orderBy: "userId"
        },
        service = {
            initialize: initialize,
            navigate: navigate,
            clear: clear,
            pages: [],
            paging: {
                options: angular.copy(initialOptions),
                info: {
                    totalItems: 0,
                    totalPages: 1,
                    currentPage: 0,
                    sortableProperties: [   "userId"  ]
                }
            }
        };

        return service;

        function initialize() {
            var queryArgs = {
                pageSize: service.paging.options.size,
                pageNumber: service.paging.info.currentPage
            };

            service.paging.info.currentPage = 1;

            return StandingDryGetAllService.query(queryArgs).$promise.then(
                function (result) {
                    var newPage = {
                        number: pageNumber,
                        IssueResult: []
                    };
                    result.IssueResult.forEach(function (Issue) {
                        newPage.IssueResult.push(Issue);
                    });

                    service.pages.push(newPage);
                    service.paging.info.currentPage = 1;
                    service.paging.info.totalPages = result.totalPages;

                    return result.$promise;
                }, function (result) {
                    return $q.reject(result);
                });
        }

        function navigate(pageNumber) {
            var dfd = $q.defer();

            if (pageNumber > service.paging.info.totalPages) {
                return dfd.reject({ error: "page number out of range" });
            }

            if (service.pages[pageNumber]) {
                service.paging.info.currentPage = pageNumber;
                dfd.resolve();
            } else {
                return load(pageNumber);
            }

            return dfd.promise;
        }

        function load(pageNumber) {
            var queryArgs = {
                pageSize: service.paging.options.size,
                pageNumber: pageNumber,
                orderBy: service.paging.options.orderBy
            };

            return StandingDryGetAllService.query(queryArgs).$promise.then(
                function (result) {
                    var newPage = {
                        number: service.paging.info.pageNumber,
                        IssueResult: []
                    };
                    result.IssueResult.forEach(function (Issue) {
                        newPage.IssueResult.push(Issue);
                    });

                    service.pages[pageNumber] = newPage;
                    service.paging.info.currentPage = pageNumber;
                    service.paging.info.totalPages = result.totalPages;
                    service.paging.info.totalItems = result.totalItems;

                    return result.$promise;
                }, function (result) {
                    return $q.reject(result);
                });
        }

        function clear() {
            service.pages.length = 0;
            service.paging.info.totalItems = 0;
            service.paging.info.currentPage = 0;
            service.paging.info.totalPages = 1;
        }
    }
})();