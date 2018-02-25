'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2/:repo', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', [
        '$scope', '$http', '$q', '$location', 'ajaxService', '$routeParams',
        function($scope, $http, $q, $location, ajaxService, $routeParams) {
            $scope.commits = null;
            $scope.query = '';
            $scope.repoName = $routeParams.repo;

            var url = 'https://api.github.com/repos/Netflix/' + $routeParams.repo + '/commits';

            ajaxService.getData(url)
                .then(function(data) {
                    $scope.commits = [];
                    for (var i in data) {
                        $scope.commits.push({
                            sha: data[i].sha,
                            login: data[i].author.login,
                            commited: data[i].commit.committer.date,
                            message: data[i].commit.message
                        });
                    }
                    // $scope.projects = data;
                }, function(e) {

                });
            $scope.orderList = "name";


            $scope.sortHandler = function(type) {
                $scope.orderList = type;
            };


        }
    ]);