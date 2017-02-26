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
        .when('/photoslider/:id', {
          controller:'sliderController',
          templateUrl:'views/photoslider.html'
        })
        .when('/videos/:id', {
          controller:'videosController',
          templateUrl:'views/videos.html'
        })
        .when('/mapa/:id', {
          controller:'mapaController',
          templateUrl:'views/mapa.html'
        })
        .when('/comentarios/:id', {
          controller:'comentariosController',
          templateUrl:'views/listacom.html'
        })        
        .otherwise({
          redirectTo:'/'
        });
    })
.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        // handle route changes     
        console.log("Cambio de página");
        console.log(next);
        console.log(current);
        
        $("#HdnAnterior").val(current);
        if(next.indexOf("detalle_sitio") !== -1
            && 
            (current.indexOf("photo") == -1 
             && current.indexOf("video") == -1
             && current.indexOf("comenta") == -1
             && current.indexOf("mapa") == -1
            )
          ) {
            $("#HdnAnteriorDetalle").val(current);
        }
        
        $("#load-div").show();
    });
});
    