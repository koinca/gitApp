'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'myApp.view1',
        'myApp.view2',
        'myApp.version'
    ])
    .service('ajaxService', ['$http', '$q',
        function($http, $q) {

            this.getData = function(url) {
                var deferred = $q.defer();
                $http.get(url, {
                        timeout: 20000
                    })
                    .then(function(out) {
                        deferred.resolve(out.data);
                    }, function(msg, code) {

                        deferred.reject(msg);
                        if (!msg) {
                            msg = 'Failed to load response data'
                        }
                        //$log.error(msg, code);
                        console.log(msg);
                    });
                return deferred.promise;
            }


        }
    ])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({
            redirectTo: '/view1'
        });
    }]);