clientws.factory('restful', function($http) {
    return{
      name: 'Sitios Service',
      get: function(url, callback){
        var baseurl = "http://city-tour-chiquimula-ws.somee.com/";
        $http
            .get(baseurl + url)
            .success(function(data) {
                callback(data);
            })
            .error(function(err){
                console.error(err);
            });
      },
      rank: function(url, dto, callback) {
       var baseurl = "http://city-tour-chiquimula-ws.somee.com/";
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
              var fn = this.get;
              setTimeout(function(){
                  fn(callback);
              }, 500);
          }
      },
      get_1:function(callback){
          console.log(uniqueDeviceId);
          if(uniqueDeviceId === '') {
            var fn = this._getInner;
            setTimeout( function(){
             fn(fn, callback);   
            }, 500);  
          }
          else{              
              if(callback)
                callback(uniqueDeviceId);
              else
                return uniqueDeviceId;
          }
      },
      _getInner_1: function(fnGetInner, callback){
        console.log("_getInner");
        console.log("if nulls..");
          console.log("windows es = " + window);
          console.log("window.plugins es = " + window.plugins);
          /*console.log("window.plugins.uniqueDeviceID es = " + window.plugins.uniqueDeviceID);
          console.log("if nulls then..");*/
        if(!(window.plugins && window.plugins.uniqueDeviceID)) {
            //Aun no estan cargados,
            console.log("son nulos objects!");
            var fn = fnGetInner;
            console.log("Objeto this es " + this);
            console.log("funcion es " + fn);
            console.log("callback es " + callback);
            setTimeout( function(){
                console.log("Llamando... ");
                fn(fn, callback);   
            }, 500);  
            console.log("retun empty");
            return '';
        }  
        console.log("NO son nulos!");  
          
        var success = function(uuid) {
            console.log("UUID = " + uuid);
            uniqueDeviceId = uuid;
            console.log(uniqueDeviceId);
            callback(uuid);
        };
        var fail = function(err){
            console.error("ERROR = " + err);
        };      
        console.log("llamando a ");  
        console.log(window.plugins.uniqueDeviceID);
        window.plugins.uniqueDeviceID.get(success, fail);
      }
    };
});

