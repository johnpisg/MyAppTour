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
      uniqueDeviceId: '',
      get:function(callback){
          console.log(uniqueDeviceId);
          if(uniqueDeviceId === '') {
            var fn = this._getInner;
            setTimeout( function(){
             fn(callback);   
            }, 500);  
          }
          else{              
              if(callback)
                callback(uniqueDeviceId);
              else
                return uniqueDeviceId;
          }
      },
      _getInner: function(callback){
          console.log("_getInner");
        //this.uniqueDeviceId
        if(window.plugins === null || window.plugins.uniqueDeviceID === null) {
            //Aun no estan cargados,
            console.log("son nulos!");
            var fn = this._getInner;
            setTimeout( function(){
             fn(callback);   
            }, 500);  
            return '';
        }  
          
        var success = function(uuid) {
            console.log("UUID = " + uuid);
            uniqueDeviceId = uuid;
            console.log(uniqueDeviceId);
            callback(uuid);
        };
        var fail = function(err){
            console.error("ERROR = " + err);
        };        
        window.plugins.uniqueDeviceID.get(success, fail);
      }
    };
});

