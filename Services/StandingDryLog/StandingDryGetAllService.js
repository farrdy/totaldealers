(function () {
    'use strict';

    angular
        .module('dealerApp')
        .factory('StandingDryGetAllService', function ($resource) {
            return $resource("api/StandingDryLog/FetchAll",
                { },
                {
                    'query': {
                        method: 'GET',
                        url: '/api/StandingDryLog/FetchAll/:pageSize/:pageNumber/:orderBy',
                        params: { pageSize: '@pageSize', pageNumber: '@pageNumber', orderBy: '@orderBy' }
                    }
                });
        });
})();
