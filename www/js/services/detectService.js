(function(){
     'use strict';

     angular
          .module('funpics')
          .service('detectService', detectService);

          function detectService($q, $http, $cordovaFileTransfer){
               const API_KEY = 'jdo9Yoh3stTB9uGkvxmxs9Vt59XEmflq';
               const API_SECRET = '_0kMlb8z7tEJovAievoGrHZqfno5kNF7';
               const API_ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/';

               this.detect = function(image_url){

                    // var paramsAPI = {
                    //      api_key: API_KEY,
                    //      api_secret: API_SECRET,
                    //      image_url: img,
                    // };

                    var url = API_ENDPOINT+'detect?api_secret='+API_SECRET+'&api_key='+API_KEY;
                    var defer = $q.defer();
                    var ft = new FileTransfer();

                     var options = {
                         fileKey: "image_file",
                         fileName: 'filename',
                         chunkedMode: false,
                         mimeType: "image/jpg",
                     };

                    ft.upload(image_url,encodeURI(url),function(r){
                    document.getElementById("debug").innerHTML = 'success'+JSON.stringify(r);
                      defer.resolve(r);
                    },function(e){
                     defer.resolve(e);
                 },options);
                 return defer.promise;

               }
          }

          detectService.$inject = ['$q', '$http', '$cordovaFileTransfer'];

})();
