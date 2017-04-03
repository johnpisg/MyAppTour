clientws.factory('restful', function($http) {
    return{
      name: 'Sitios Service',
      get: function(url, callback){
        var baseurl = webServiceBaseUrl;
        $http
            .get(baseurl + url)
            .success(function(data) {
                callback(data);
            })
            .error(function(err){
                console.error(err);
            });
      },
      getMapsApi: function(url, indice, callback){
        $http
            .get(url)
            .success(function(data) {
                callback(data, indice);
            })
            .error(function(err){
                console.error(err);
            });
      },
      post: function(url, dto, callback) {
       var baseurl = webServiceBaseUrl;
       $http
            .post(baseurl + url, dto)
            .success(function(data) {
                callback(data);
            })
            .error(function(err){
                console.error(err);
            });
      }
    };
});


// Get UUID
// window.plugins.uniqueDeviceID.get(success, fail);
clientws.service('uniqueDevice', function() {
    uniqueDeviceId = '';
    fnGet = null;
    return {
      name: 'Unique Device ID',    
      get:function(callback) {
          if(window.device) {              
            uniqueDeviceId = window.device.uuid;
            if(callback)
                callback(uniqueDeviceId);
            else
                return uniqueDeviceId;          
          }else {
              console.log(this);
              if(!fnGet)
                fnGet = this.get;
              console.log(fnGet);
              setTimeout(function(){
                  console.log(fnGet);
                  fnGet(callback);
              }, 500);
          }
      }
    };
});

clientws.service('navigation', function() {
    return {
      name: 'navigation',    
      paginas: {
          "home" : "",
          "detalle_sitio" : "home",
          "fotos" : "detalle_sitio",
          "videos" : "detalle_sitio",
          "comentarios" : "detalle_sitio",
          "top5" : "",
      }
    };
});





