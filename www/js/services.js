clientws.factory('restful', function($http) {
    return{
      name: 'Sitios Service',
      get: function(url, callback){
        var baseurl = "http://localhost:3000/"
        $http
            .get(baseurl + url)
            .success(function(data) {
                callback(data);
            })
            .error(function(err){
                console.error(err);
            });
      }
    };
});