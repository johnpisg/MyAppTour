angular
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
        .when('/detalle_sitio', {
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
    })
    .controller('mainController', function($scope) {
        $scope.modelo = {
          mensaje: "Hola mundo!"
        };
        
        var sitio = {
            nombre: "Mi Sitio",
            titulo: "Sitio Exclusivo",
            descripcion: "Algun texto descriptivo de este sitio aquí.",
            ranking: 3,
            imagen: "img/chiquimula3.jpg"
        };
    
        $scope.modelo.sitios = [];
        
        $scope.loadSitios = function() {
            $scope.modelo.sitios = [];
            for(var i=1; i<10; i++) {
                var newSitio = $.extend(true, {}, sitio);    
                newSitio.titulo = newSitio.titulo + "[" + i + "]";
                $scope.modelo.sitios.push(newSitio);
            }
        }
        
        $scope.loadSitios();
    
    })
    .controller('top5Controller', function($scope) {
        $scope.modelo = {
          mensaje: "Hola mundo!"
        };
        
        var sitio = {
            nombre: "Sitio VIP",
            titulo: "Sitio VIP",
            descripcion: "Lo mejor de chiquimula.",
            ranking: 4,
            imagen: "img/chiquimula3.jpg"
        };
    
        $scope.modelo.sitios = [];
        
        $scope.loadSitios = function() {
            $scope.modelo.sitios = [];
            for(var i=1; i<5; i++) {
                var newSitio = $.extend(true, {}, sitio);    
                newSitio.titulo = newSitio.titulo + "[" + i + "]";
                $scope.modelo.sitios.push(newSitio);
            }
        }
        
        $scope.loadSitios();
    
    })
    .controller('detalleController', function($scope){
        $scope.sitio = {
            nombre: "Mi Sitio",
            titulo: "Sitio Exclusivo",
            descripcion: "Algun texto descriptivo de este sitio aquí.",
            ranking: 3,
            imagen: "img/chiquimula3.jpg"
        };
    })
    .controller('cercanoController', function($scope){
        $scope.modelo = {
          mensaje: "Más cercanos"
        };
    
        var sitio = {
            nombre: "Cercano",
            titulo: "Sitio cercano",
            descripcion: "Sitio más cercano a este sitio aquí.",
            ranking: 4,
            imagen: "img/chiquimula3.jpg"
        };
    
        $scope.modelo.sitios = [];
        
        $scope.loadSitios = function() {
            $scope.modelo.sitios = [];
            for(var i=1; i<5; i++) {
                var newSitio = $.extend(true, {}, sitio);    
                newSitio.titulo = newSitio.titulo + "[" + i + "]";
                $scope.modelo.sitios.push(newSitio);
            }
        }
        
        $scope.getPosicion = function() {
             
        }
        
        $scope.loadSitios();
        $scope.getPosicion();
    })
    .controller('sliderController', function($scope){
          $scope.myInterval = 5000;
          $scope.noWrapSlides = false;
          $scope.active = 0;
          var slides = $scope.slides = [];
          var currIndex = 0;

          $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
              image: 'http://unsplash.it/' + newWidth + '/300',
              text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
              id: currIndex++
            });
          };

          $scope.randomize = function() {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
          };

          for (var i = 0; i < 4; i++) {
            $scope.addSlide();
          }

          // Randomize logic below

          function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
              slides[i].id = indexes.pop();
            }
          }

          function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
              indexes[i] = i;
            }
            return shuffle(indexes);
          }

          // http://stackoverflow.com/questions/962802#962890
          function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
              while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
              }
            }

            return array;
          }        
    })
    ;
