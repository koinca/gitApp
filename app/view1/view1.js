angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [
        '$scope', '$http', '$q', '$location', 'ajaxService',
        function($scope, $http, $q, $location, ajaxService) {

            $scope.projects = null;
            $scope.query = '';

            var url = 'https://api.github.com/orgs/netflix/repos';

            ajaxService.getData(url)
                .then(function(data) {
                    $scope.projects = [];
                    for (var i in data) {
                        $scope.projects.push({
                            name: data[i].name,
                            forks: data[i].forks,
                            watchers: data[i].watchers,
                            open_issues: data[i].open_issues,
                        });
                    }
                    // $scope.projects = data;
                }, function(e) {

                });
            $scope.orderList = "name";


            $scope.sortHandler = function(type) {
                $scope.orderList = type;
            };

            $scope.gotoCommits = function(repo) {
                $location.path('/view2/' + repo);

            };

        }
    ]);