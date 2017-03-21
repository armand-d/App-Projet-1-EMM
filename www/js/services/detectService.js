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

                    var defer = $q.defer();

                    var url = API_ENDPOINT+'detect?api_secret='+API_SECRET+'&api_key='+API_KEY;
                    var ft = new FileTransfer();

                    var  options = {
                         fileKey: "image_file",
                         fileName: 'filename',
                         chunkedMode: false,
                         mimeType: "image/jpeg",
                    };

                    ft.upload(image_url,encodeURI(url),function(r){
                        defer.resolve(r.response);
                    },function(e){
                        defer.resolve(e.response);
                    },options);

                    return defer.promise;
                }
          }

          detectService.$inject = ['$q', '$http', '$cordovaFileTransfer'];

})();
