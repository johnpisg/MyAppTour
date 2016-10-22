var clientws = angular
    .module('clientws', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(function($routeProvider) {
        
        $routeProvider
        .when('/', {
          controller:'mainController',
          templateUrl:'views/main.html'
        }) 
        .when('/top5', {
          controller:'top5Controller',
          templateUrl:'views/top5.html'
        }) 
        .when('/detalle_sitio/:id', {
          controller:'detalleController',
          templateUrl:'views/detalle_sitio.html'
        })
        .when('/mascercano', {
          controller:'cercanoController',
          templateUrl:'views/mascercano.html'
        })
        .when('/photoslider', {
          controller:'sliderController',
          templateUrl:'views/photoslider.html'
        })
        .otherwise({
          redirectTo:'/'
        });
    });
    