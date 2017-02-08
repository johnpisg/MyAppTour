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
        .when('/videos', {
          controller:'videosController',
          templateUrl:'views/videos.html'
        })
         .when('/mapa/:id', {
          controller:'mapaController',
          templateUrl:'views/mapa.html'
        })
        .otherwise({
          redirectTo:'/'
        });
    })
.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        // handle route changes     
        console.log("Cambio de página");
        $("#load-div").show();
    });
});
    