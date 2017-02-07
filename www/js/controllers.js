clientws.controller('mainController', ["$scope", "restful", "uniqueDevice",
   function($scope, restful, uniqueDevice) {
       
        //Obtener el UUID
        uniqueDevice.get();
       
        $scope.modelo = {
          mensaje: ""
        };
    
        $scope.siteImages = "http://city-tour-chiquimula.somee.com/";
    
        var sitio = {
            nombre: "",
            titulo: "",
            descripcion: "",
            ranking: 0,
            imagen: ""            
        };
    
        $scope.modelo.sitios = [];
    
        $scope.getImagenUrl = function(sitio){
            if(sitio.imagenes.length > 0) {
                var imgUrl = sitio.imagenes[0];
                imgUrl = imgUrl.replace("~/", "");
                return $scope.siteImages + imgUrl;
            }
            return "";
        };
        
        $scope.loadSitios = function() {
            console.log("loadSitios");
            $scope.modelo.sitios = [];
            restful.get("api/sitio/", function(data){
                $scope.modelo.sitios = data; 
                console.log(data);
                $("#load-div").hide();
            });
            
        };
        
        $scope.loadSitios();
    
    }]);

clientws.controller('top5Controller', ["$scope", "uniqueDevice", 
   function($scope, uniqueDevice) {
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
    
    }]);

clientws.controller('detalleController', ["$scope", "restful", "$uibModal", "$log", "$document", "$routeParams", "uniqueDevice", function($scope, restful, $uibModal, $log, $document, $routeParams, uniqueDevice){
        $scope.sitio = {
            id: $routeParams.id,
            nombre: "Mi Sitio",
            titulo: "Sitio Exclusivo",
            descripcion: "Algun texto descriptivo de este sitio aquí.",
            ranking: 3,
            imagen: "img/chiquimula3.jpg",
            info: "Información turística aquí: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias voluptate, soluta deserunt illum eaque quaerat? Aliquid assumenda sit, placeat, ea dicta quae ipsam quisquam quia, nisi et tenetur numquam modi! Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            datos: "Dirección y ubcación aquí: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias voluptate, soluta deserunt illum eaque quaerat? Aliquid assumenda sit, placeat, ea dicta quae ipsam quisquam quia, nisi et tenetur numquam modi! Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            masdatos: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias voluptate, soluta deserunt illum eaque quaerat? Aliquid assumenda sit, placeat, ea dicta quae ipsam quisquam quia, nisi et tenetur numquam modi! Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            horario: "Abierto todo el día",
            precio: "Q. 0.00 GRATIS",
            userRating: 0,
            desactivarRating: false 
        };
    
        
        $scope.loadSitio = function() {
            /*restful.get("api/sitio/" + $routeParams.id, function(data){
                $scope.sitio = data;    
            });*/
            $scope.uuid = uniqueDevice.get();
        };
    
        $scope.ratedCallback = function() {
            console.log(uniqueDevice.get());
            console.log($scope.sitio.userRating);
            //Llamar al WS de ranking
            var dataToSend = {
                SitioId: $scope.sitio.id,
                RankingActual: 0,
                Rank: $scope.sitio.userRating
            };
            restful.rank("api/sitio/", dataToSend, function(data){
               console.log(data); 
               $scope.sitio.desactivarRating = true;
            });            
        };
        
        $scope.openComment = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalComment.html',
                controller: 'CommentController',
                size: 'lg'
            });
        };
    
        $scope.loadSitio();
    
}]);

clientws.controller('cercanoController', function($scope){
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
    });
    
clientws.controller('sliderController', function($scope){
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
    });

clientws.controller('CommentController', ["$scope", "$interval", "$uibModalInstance", "uniqueDevice",
  function($scope, $interval, $uibModalInstance, uniqueDevice) {
        $scope.modelo = {
            desc: "",
            rank: 0
        };
    
        var stop;
        $scope.animar = function() {
            stop = $interval(function() {
                $scope.modelo.rank = $scope.modelo.rank + 1;
                if($scope.modelo.rank == 5) {
                    $scope.modelo.rank = 0;
                    $interval.cancel(stop);
                    $scope.modelo.rank = 0;
                }
            }, 500);
        };
        
        $scope.animar();
    
        $scope.guardar = function() {
            $uibModalInstance.close();
        };
        
        $scope.cancelar = function() {
            $uibModalInstance.dismiss();    
        };
    }]);

clientws.controller('videosController', ["$scope",
 function($scope){
     $scope.titulo = "Videos del sitio"                                        
 }]);