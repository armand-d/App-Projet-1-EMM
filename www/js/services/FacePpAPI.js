(function(){
     'use strict';

     angular
          .module('funpics')
          .service('FacePpAPI', FacePpAPI);

          function FacePpAPI($q, $http, $cordovaFileTransfer){
               
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

            this.analyze = function(token){

                var url = API_ENDPOINT+'face/analyze';

                var paramsAPI = {
                    api_secret: API_SECRET,
                    api_key : API_KEY,
                    face_tokens: token,
                    return_landmark : 1
                };

                var req = $http({
                    method: 'POST',
                    url: url,
                    params: paramsAPI,
                }).then(
                    function successCallback(response) {
                        console.log(JSON.stringify(response));
                    }, function errorCallback(response) {
                        console.log(JSON.stringify(response));
                    }
                );

                return req;
            }
          }

          FacePpAPI.$inject = ['$q', '$http', '$cordovaFileTransfer'];

})();
