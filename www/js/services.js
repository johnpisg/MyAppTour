clientws.factory('restful', function($http) {
    return{
      name: 'Sitios Service',
      get: function(url, callback){
        var baseurl = "http://city-tour-chiquimula-ws.somee.com/"
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
       var baseurl = "http://city-tour-chiquimula-ws.somee.com/"
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
      get:function(){
          console.log(uniqueDeviceId);
          if(uniqueDeviceId == '')
            setTimeout(this._getInner, 500);  
          else
              return uniqueDeviceId;
      },
      _getInner: function(){
          console.log("_getInner");
        //this.uniqueDeviceId
        if(window.plugins == null || window.plugins.uniqueDeviceID == null) {
            //Aun no estan cargados,
            console.log("son nulos!");
            setTimeout(this._getInner, 500);  
            return '';
        }  
          
        var success = function(uuid) {
            console.log("UUID = " + uuid);
            uniqueDeviceId = uuid;
            console.log(uniqueDeviceId);
        }
        var fail = function(err){
            console.error("ERROR = " + err);
        }        
        window.plugins.uniqueDeviceID.get(success, fail);
      }
    };
});

