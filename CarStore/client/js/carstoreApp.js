var carstoreApp = angular.module('carstoreApp', ['ngRoute', 'ngResource', 'carControllers']);

carstoreApp.factory('CarStorage', ['$resource',
    function($resource) {

        return $resource("/api/cars/:id", {}, {
            get: {method: 'GET', cache: false, isArray: true},
            save: {method: 'POST', cache: false, isArray: false},
            update: {method: 'PUT', cache: false, isArray: false},
            delete: {method: 'DELETE', cache: false, isArray: false}
        });

    }]);

carstoreApp.factory('userData', function () {
  return { name: '' };
});

carstoreApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/cars', {
                templateUrl: 'partials/car-list.html',
                controller: 'CarListCtrl',
                requiresLogin: true
            }).
            when('/cars/:carId', {
                templateUrl: 'partials/car-detail.html',
                controller: 'CarDetailCtrl',
                requiresLogin: true
            }).
            when('/candy', {
                templateUrl: 'partials/candy-detail.html',
                controller: 'CarListCtrl',
                requiresLogin: true
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl',
                requiresLogin: false
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);

var carControllers = angular.module('carControllers', []);

carControllers.controller('MainCtrl', ['$scope', '$http', '$location', 'userData',
    function ($scope, $http, $location, userData) {

        $scope.userData = userData;
        if (window.localStorage.getItem('userData.name')) {
          $scope.userData.name = window.localStorage.getItem('userData.name');
          $http.defaults.headers.common['Authorization'] = 'Bearer '+window.localStorage.getItem('token');
        }

        $scope.isCandyTime = function() {
            return ($location.url().indexOf('candy') >= 0);
        };

        $scope.$on('$routeChangeStart', function (event, next) {

          if (next.requiresLogin && !$scope.isLoggedIn()) {
            event.preventDefault();
            $location.path('/login');
          }

        });

        $scope.isLoggedIn = function() {
            return ( $scope.userData.name != null && $scope.userData.name != '' );
        };

    }]);

carControllers.controller('CarListCtrl', ['$scope', '$resource', 'CarStorage',
    function ($scope, $resource, CarStorage) {

        function loadCars() {
            CarStorage.get({},
                function success(response) {
                    $scope.cars = response;
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
            );
        }

        $scope.saveCar = function() {
            CarStorage.save($scope.newCar, function success(response) {
                    console.log( "save success response"+JSON.stringify(response) );
                    $scope.newCar = null;
                    loadCars();
                },
                function error(errorResponse) {
                    alert("Error:" + JSON.stringify(errorResponse));
                }
            );
        };

        $scope.deleteCar = function(car) {

          CarStorage.delete({id:car.id}, function success(response) {
                    console.log( "delete success response"+JSON.stringify(response) );
                    loadCars();
                },
                function error(errorResponse) {
                    alert("Error:" + JSON.stringify(errorResponse));
                }
            );

        };

        loadCars();
        $scope.orderProp = 'make';
        $scope.newCar = null;

    }]);

carControllers.controller('CarDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.carId = $routeParams.carId;
    }]);

carControllers.controller('LoginCtrl', ['$scope', '$http', '$timeout', '$location', 'userData',
    function($scope, $http, $timeout, $location, userData) {

        $scope.userData = userData;
        $scope.status = '';

        $scope.login = {
            username: null,
            password: null
        };

        $scope.login = function() {
            $http.post('/token', {name: $scope.login.username, password: $scope.login.password}).
                success(function(data, status, headers, config) {

                    if (data != null && data.token != null) {
                      $http.defaults.headers.common['Authorization'] = 'Bearer '+data.token;
                      $scope.userData.name = $scope.login.username;
                      window.localStorage.setItem('userData.name', $scope.login.username);
                      window.localStorage.setItem('token', data.token);
                      $location.path('/cars');

                    }

                }).
                error(function(data, status, headers, config) {
                    $scope.status = 'ERROR';
                });

            $scope.status = 'Pending';
        };

    }]);
