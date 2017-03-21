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

                ft.upload(image_url,encodeURI(url),
                  function successCallback(r){
                    defer.resolve(r.response);
                  },function errorCallback(e){
                      defer.reject(e.response);
                  },options);

                return defer.promise;
            }

            this.analyze = function(token){

                var defer = $q.defer();

                var url = API_ENDPOINT+'face/analyze';

                var paramsAPI = {
                    api_secret: API_SECRET,
                    api_key : API_KEY,
                    face_tokens: token,
                    return_landmark : 1,
                    return_attributes : 'gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity'
                };

                $http({
                    method: 'POST',
                    url: url,
                    params: paramsAPI,
                }).then(
                    function successCallback(r) {
                        defer.resolve(r);
                    }, function errorCallback(e) {
                        defer.reject(e);
                    }
                );

                return defer.promise;
            }
          }

          FacePpAPI.$inject = ['$q', '$http', '$cordovaFileTransfer'];

})();
