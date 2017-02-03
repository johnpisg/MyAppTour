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