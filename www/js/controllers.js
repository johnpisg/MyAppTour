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
        }
        
        $scope.loadSitios();
    
    }]);

clientws.controller('detalleController', ["$scope", "restful", "$uibModal", "$log", "$document", "$routeParams", "uniqueDevice", 
                                          function($scope, restful, $uibModal, $log, $document, $routeParams, uniqueDevice){
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
            $scope.getComentarios();
        };
    
        $scope.getComentarios = function() {
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
            var sitioId = $scope.sitio.id;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalComment.html',
                controller: 'CommentController',
                size: 'lg',
                resolve: {
                   sitioObj: function () {
                       return {'id':sitioId };
                   }
               }
            });
            
            modalInstance.result.then(function(){
                //Call function to reload the list
                console.log("Retorno!");
                $scope.getComentarios();
            });
        };
    
        $scope.compartirSitio = function(){
            console.log("compartir sitio..");
            var mensaje = $scope.sitio.titulo;
            var asunto = "Empieza ya tu City Tour Chiquimula!";
            var imagen = encodeURI($scope.getImagenUrl($scope.sitio));
            var linkApp = "https://play.google.com/store/apps/details?id=uk.co.aifactory.chessfree&hl=es";
            console.log(imagen);
            window.plugins.socialsharing.share(mensaje, asunto, imagen, linkApp);
        };
    
        $scope.loadSitio();
}]);

clientws.controller('cercanoController', ["$scope", "restful", "$uibModal", "$timeout", "$document", "$routeParams", "uniqueDevice", 
                                          function($scope, restful, $uibModal, $timeout, $document, $routeParams, uniqueDevice){
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
        
        $scope.siteImages = "http://city-tour-chiquimula.somee.com/";
        $scope.getImagenUrl = function(sitio){
            if(sitio.imagenes && sitio.imagenes.length > 0) {
                var imgUrl = sitio.imagenes[0];
                imgUrl = imgUrl.replace("~/", "");
                return $scope.siteImages + imgUrl;
            }
            return "img/imgDefault.jpg";
        };
       
        $scope.loadSitios = function(lat, long, radio, fnCallback) {
            if(!radio){
                radio = 1000;
            }
            console.log("Más cercanos al punto actual");
            var uuid = uniqueDevice.get();
            console.log("device unique Id para enviar es = " + uuid);
            $scope.modelo.sitios = [];
            var dto = {};
            dto.Latitud = lat;
            dto.Longitud = long;
            dto.RadioKm = radio;
            dto.DeviceId = uuid;
            
            restful.post("api/Geo", dto, function(data){
                $scope.modelo.sitios = data; 
                console.log(data);
                
                if(fnCallback){
                    fnCallback(data);
                }
                        
                $timeout(function(){
                    $scope.$apply();                    
                }, 100);
                
                $("#load-div").hide();
            });            
        }
        
}]);
    
clientws.controller('sliderController', ["$scope", "uniqueDevice", "restful", "$routeParams", "$location", "$window", 
   function($scope, uniqueDevice, restful, $routeParams, $location, $window) {
        $scope.items = [];
            
        $scope.siteImages = "http://city-tour-chiquimula.somee.com/";
        $scope.getImagenesUrl = function(sitio) {
            $scope.items = [];
            for(var i=0; sitio.imagenes && i<sitio.imagenes.length; i++ ){
                var imgUrl = sitio.imagenes[i]; 
                imgUrl = imgUrl.replace("~/", "");
                imgUrl = $scope.siteImages + imgUrl;
                imgUrl = encodeURI(imgUrl);
                //$scope.addSlide(imgUrl, "Imagen " + (i+1));
                $scope.items.push({
                    src: imgUrl,
                    w:2500,
                    h:2500
                });
            }
        };
    
        $scope.loadSitio = function() {
            $scope.uuid = uniqueDevice.get();
            $("#LblNohay").hide();
            restful.get("api/sitio/" + $routeParams.id + "?deviceUniqueId=" + $scope.uuid, function(data){
                $scope.sitio = data;  
                console.log(data);
                $scope.getImagenesUrl(data);
                if($scope.items.length > 0) {
                    setTimeout(function(){
                        $scope.iniciarGaleria($scope.items);    
                        $("#load-div").hide();
                    }, 1);    
                }else{
                    $("#LblNohay").show();
                    $("#load-div").hide();
                }  
            });            
        };
    
        $scope.iniciarGaleria = function(items) {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            // build items array
            
            // define options (if needed)
            var options = {
                // optionName: 'option value'
                // for example:
                index: 0 // start at first slide
            };

            // Initializes and opens PhotoSwipe
            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
            
            // Gallery starts closing
            //gallery.listen('close', function() { });
            // Gallery unbinds events
            // (triggers before closing animation)
            //gallery.listen('unbindEvents', function() { });
            // After gallery is closed and closing animation finished.
            // Clean up your stuff here.
            gallery.listen('destroy', function() { 
                $("#load-div").show();
                console.log("redireccionando..");
                //console.log($location);
                //$location.path("detalle_sitio/" + $routeParams.id);
                setTimeout(function(){
                    $window.location.href = "#/detalle_sitio/" + $routeParams.id;
                }, 300); 
            });
        };
       
       $scope.loadSitio();
       
    }]);

clientws.controller('CommentController', ["$scope", "$interval", "$uibModalInstance", "uniqueDevice", "restful", "sitioObj",
  function($scope, $interval, $uibModalInstance, uniqueDevice, restful, sitioObj) {
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
                var sitioId = sitioObj.id;
                console.log(sitioId);
                var dataToSend = {};
                dataToSend.Usuario = "Usuario anónimo";
                dataToSend.Texto = $scope.modelo.desc;
                dataToSend.sitioId = sitioId;
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
    
        $scope.compartirMapa = function() {
            //https://www.google.com/maps/dir/Current+Location/14.799427,-89.546403
            //var urlMapa = "https://www.google.com/maps/dir/Current+Location/";
            //http://maps.google.com/?q=
            //var urlMapa = "http://maps.google.com/?q=";
            //var ulrMapa = "https://www.google.com/maps/preview/@";
            //urlMapa = urlMapa + $scope.sitio.latitud + "," + $scope.sitio.longitud + ",8z";
//            var urlMapa = "http://www.google.com/maps/place/";
//            urlMapa = urlMapa + $scope.sitio.latitud + "," + $scope.sitio.longitud;
//            console.log("compartir mapa..");
//            var mensaje = "Visitemos " + $scope.sitio.titulo;
//            var asunto = "Empieza ya tu City Tour Chiquimula!";
//            var imagen = urlMapa;
//            var linkApp = "https://play.google.com/store/apps/details?id=uk.co.aifactory.chessfree&hl=es";
//            window.plugins.socialsharing.share(mensaje, asunto, imagen, linkApp);
            
            var linkApp = "https://play.google.com/store/apps/details?id=uk.co.aifactory.chessfree&hl=es";
            var urlMapa = "http://www.google.com/maps/place/";
            urlMapa = urlMapa + $scope.sitio.latitud + "," + $scope.sitio.longitud;
            // this is the complete list of currently supported params you can pass to the plugin (all optional)
            var options = {
              message: "Visitemos " + $scope.sitio.titulo, // not supported on some apps (Facebook, Instagram)
              subject: "Empieza ya tu City Tour Chiquimula!", // fi. for email
              //files: ['', ''], // an array of filenames either locally or remotely
              url: urlMapa
            }

            var onSuccess = function(result) {
              console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
              console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
            }

            var onError = function(msg) {
              console.log("Sharing failed with message: " + msg);
            }

            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        }
    
        $scope.loadSitio();
    
}]);

clientws.controller('comentariosController', ["$scope", "restful", "$uibModal", "$log", "$document", "$routeParams", "uniqueDevice", function($scope, restful, $uibModal, $log, $document, $routeParams, uniqueDevice){
    $scope.titulo = "";
    $scope.comentarios = [];
    $scope.loadComentarios = function() {
        $scope.uuid = uniqueDevice.get();      
        restful.get("api/sitio/" + $routeParams.id + "?deviceUniqueId=" + $scope.uuid, function(data){
            $scope.titulo = data.titulo;
            restful.get("api/comentario/" + $routeParams.id + "?deviceUniqueId=" + $scope.uuid, function(data){
                $scope.comentarios = data;
                $("#load-div").hide();
            }); 
        }); 
       
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
    
    $scope.loadComentarios();
    
}]);