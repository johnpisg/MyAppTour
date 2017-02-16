clientws.controller('mainController', ["$scope", "restful", "uniqueDevice",
   function($scope, restful, uniqueDevice) {
       
        $scope.modelo = {
          mensaje: ""
        };
    
        var sitio = {
            nombre: "",
            titulo: "",
            descripcion: "",
            ranking: 0,
            imagen: ""            
        };
    
        $scope.modelo.sitios = [];
    
        $scope.siteImages = "http://city-tour-chiquimula.somee.com/";
        $scope.getImagenUrl = function(sitio){
            if(sitio.imagenes && sitio.imagenes.length > 0) {
                var imgUrl = sitio.imagenes[0];
                imgUrl = imgUrl.replace("~/", "");
                return $scope.siteImages + imgUrl;
            }
            return "img/imgDefault.jpg";
        };
        
        $scope.loadSitios = function() {
            console.log("loadSitios");
            var uuid = uniqueDevice.get();
            console.log("device unique Id para enviar es = " + uuid);
            $scope.modelo.sitios = [];
            restful.get("api/sitio?deviceUniqueId=" + uuid, function(data){
                $scope.modelo.sitios = data; 
                console.log(data);
                $("#load-div").hide();
            });            
        };
        
       //Obtener el UUID, llamar desde el splash
       console.log("llamando GET..");
       console.log(uniqueDevice);
        uniqueDevice.get(function(uuid){
            console.log("uui");
            $scope.loadSitios();
        });
    
    }]);

clientws.controller('top5Controller', ["$scope", "uniqueDevice", "restful", 
   function($scope, uniqueDevice, restful) {
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
        
        $scope.siteImages = "http://city-tour-chiquimula.somee.com/";
        $scope.getImagenUrl = function(sitio){
            if(sitio.imagenes && sitio.imagenes.length > 0) {
                var imgUrl = sitio.imagenes[0];
                imgUrl = imgUrl.replace("~/", "");
                return $scope.siteImages + imgUrl;
            }
            return "img/imgDefault.jpg";
        };
       
        $scope.loadSitios = function() {
            console.log("TOP 5 loadSitios");
            var top = 5;
            var uuid = uniqueDevice.get();
            console.log("device unique Id para enviar es = " + uuid);
            $scope.modelo.sitios = [];
            restful.get("api/sitio?deviceUniqueId=" + uuid + "&number=" + top, function(data){
                $scope.modelo.sitios = data; 
                console.log(data);
                $("#load-div").hide();
            });
            /*$scope.modelo.sitios = [];
            for(var i=1; i<5; i++) {
                var newSitio = $.extend(true, {}, sitio);    
                newSitio.titulo = newSitio.titulo + "[" + i + "]";
                $scope.modelo.sitios.push(newSitio);
            }*/
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
            rankear: false 
        };
        $scope.horarios = [];
        $scope.getHorarios = function(strHorarios){
            //Lunes(06:00-20:00)|Martes(06:00-20:00)|Miércoles(06:00-20:00)|Jueves(06:00-20:00)|Viernes(06:00-20:00)|Sábado(06:00-20:00)|Domingo(06:00-20:00)|
            console.log(strHorarios);
            if(strHorarios){
                var arra = strHorarios.split("|");
                arra = arra.filter(function(e){return e}); 
                return arra;
            }
            return [];
        };
        
        $scope.formattedDate = function(date) {
            var d = new Date(date || Date.now()),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [day, month, year].join('/');
        }
    
        $scope.comentarios = [
            {Texto:"primer comentario", Usuario:"user1", fecha:new Date()},
            {Texto:"primer comentario", Usuario:"user1", fecha:new Date()},
            {Texto:"primer comentario", Usuario:"user1", fecha:new Date()},
            {Texto:"primer comentario", Usuario:"user1", fecha:new Date()}
        ];
    
        $scope.siteImages = "http://city-tour-chiquimula.somee.com/";
        $scope.getImagenUrl = function(sitio){
            if(sitio.imagenes && sitio.imagenes.length > 0) {
                var imgUrl = sitio.imagenes[0];
                imgUrl = imgUrl.replace("~/", "");
                return $scope.siteImages + imgUrl;
            }
            return "img/imgDefault.jpg";
        };
    
        $scope.loadSitio = function() {
            $scope.uuid = uniqueDevice.get();
            restful.get("api/sitio/" + $routeParams.id + "?deviceUniqueId=" + $scope.uuid, function(data){
                $scope.sitio = data;  
                $scope.sitio.userRating = Math.round($scope.sitio.ranking*10)/10;
                console.log("$scope.sitio.horario=" + $scope.sitio.horario);
                $scope.horarios = $scope.getHorarios($scope.sitio.horario);
                console.log("rankear=" + $scope.sitio.rankear);
                $("#load-div").hide();
            }); 
            restful.get("api/comentario/" + $routeParams.id + "?deviceUniqueId=" + $scope.uuid, function(data){
                $scope.comentarios = data;
            }); 
        };
    
        $scope.ratedCallback = function() {
            console.log(uniqueDevice.get());
            console.log($scope.sitio.userRating);
            $scope.uuid = uniqueDevice.get();
            //Llamar al WS de ranking
            var dataToSend = {
                SitioId: $scope.sitio.id,
                RankingActual: 0,
                Rank: $scope.sitio.userRating,
                DeviceId: $scope.uuid
            };
            restful.post("api/sitio/", dataToSend, function(data){
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
            $("#load-div").hide();
        }
        
        $scope.getPosicion = function() {
             
        }
        
        $scope.loadSitios();
        $scope.getPosicion();
        
    });
    
clientws.controller('sliderController', ["$scope", "uniqueDevice", "restful", "$routeParams", 
   function($scope, uniqueDevice, restful, $routeParams) {
          $scope.myInterval = 5000;
          $scope.noWrapSlides = false;
          $scope.active = 0;
          
        var slides = $scope.slides = [];
        var currIndex = 0;
            
        $scope.siteImages = "http://city-tour-chiquimula.somee.com/";
        $scope.getImagenesUrl = function(sitio) {
            for(var i=0; sitio.imagenes && i<sitio.imagenes.length; i++ ){
                var imgUrl = sitio.imagenes[i]; 
                imgUrl = imgUrl.replace("~/", "");
                imgUrl = $scope.siteImages + imgUrl;
                
                $scope.addSlide(imgUrl, "Imagen " + (i+1));
            }
        };
    
        $scope.loadSitio = function() {
            $scope.uuid = uniqueDevice.get();
            restful.get("api/sitio/" + $routeParams.id + "?deviceUniqueId=" + $scope.uuid, function(data){
                $scope.sitio = data;  
                console.log(data);
                $scope.getImagenesUrl(data);
                $("#load-div").hide();
            });            
        };
    
          $scope.addSlide = function(url, title) {
            slides.push({
              image: url,
              text: title,
              id: currIndex++
            });
          };

          $scope.randomize = function() {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
          };

          /*for (var i = 0; i < 4; i++) {
            $scope.addSlide();
          }
            $("#load-div").hide();*/

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
       
       $scope.loadSitio();
       
    }]);

clientws.controller('CommentController', ["$scope", "$interval", "$uibModalInstance", "uniqueDevice", "restful",
  function($scope, $interval, $uibModalInstance, uniqueDevice, restful) {
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
        
        //$scope.animar();
    
        $scope.guardar = function() {
            $scope.uuid = uniqueDevice.get();
            if($scope.modelo.desc){
                var dataToSend = {};
                dataToSend.Usuario = "Usuario anónimo";
                dataToSend.Texto = $scope.modelo.desc;
                dataToSend.sitioId = 1;
                dataToSend.deviceUniqueId = $scope.uuid;
                dataToSend.fecha = new Date();
                
                restful.post("api/comentario", dataToSend, function(data){
                    console.log(data);                     
                    $uibModalInstance.close();    
                });
            }
        };
        
        $scope.cancelar = function() {
            $uibModalInstance.dismiss();    
        };
    }]);

clientws.controller('videosController', ["$scope", "$sce", "$routeParams", "restful",
 function($scope, $sce, $routeParams, restful){
     $scope.titulo = "Videos del sitio"    
     $("#load-div").hide();
     
     $scope.videosUrl = [];
     
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };
     
     $scope.loadVideosSitio = function() {
        restful.get("api/video/" + $routeParams.id, function(data){
            $scope.videosUrl = data;  
            $("#load-div").hide();
        });            
    };
     
     $scope.getHideFn = function(index){
        return "$('.load" + index + "').hide();";    
     };
     
    $scope.loadVideosSitio();
     
 }]);

clientws.controller('mapaController', ["$scope", "restful", "$uibModal", "$log", "$document", "$routeParams", "uniqueDevice", function($scope, restful, $uibModal, $log, $document, $routeParams, uniqueDevice){
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
            $scope.uuid = uniqueDevice.get();
            restful.get("api/sitio/" + $routeParams.id + "?deviceUniqueId=" + $scope.uuid, function(data){
                $scope.sitio = data;  
                $("#load-div").hide();
            });            
        };
    
        $scope.ratedCallback = function() {
                
        };
    
        $scope.loadSitio();
    
}]);