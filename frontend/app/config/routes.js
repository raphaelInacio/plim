angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider
        .state('home', {
            url : "/home",
            templateUrl: "home/index.html"
        })
        .state('pedidos', {
            url : "/pedidos",
            templateUrl: "meus-pedidos/index.html"
        })
        .state('novo', {
            url : "/novo",
            templateUrl: "novo/index.html"
        })
       $urlRouterProvider.otherwise('/home')
    }
])