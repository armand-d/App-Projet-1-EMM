(function(){
     'use strict';

     angular
          .module('funpics')
          .service('detectService', detectService);

          function detectService($http, $cordovaFileTransfer){
               const API_KEY = 'jdo9Yoh3stTB9uGkvxmxs9Vt59XEmflq';
               const API_SECRET = '_0kMlb8z7tEJovAievoGrHZqfno5kNF7';
               const API_ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/';

               this.detect = function(image_url){
                    
                    // var paramsAPI = {
                    //      api_key: API_KEY,
                    //      api_secret: API_SECRET,
                    //      image_url: img,
                    // };

                    url = API_ENDPOINT+'detect?api_secret='+API_SECRET+'&api_key='+API_KEY;

                    ft = new FileTransfer();

                     var options = {
                         fileKey: "image_file",
                         fileName: 'filename',
                         chunkedMode: false,
                         mimeType: "image/jpg",
                     };

                    ft.upload(image_url,encodeURI(url),function(r){
                      console.log(r);
                      $('body').html(r);
                    },function(e){
                      console.log(e);
                      $('body').html(r);
                    },options)

                    // var req = $http({
                    //      method: 'POST',
                    //      url: API_ENDPOINT,
                    //      params: paramsAPI,
                    // }).then(
                    //      function successCallback(response) {
                    //           document.getElementById("debug").innerHTML = 'sucess '+JSON.stringify(response);
                    //      }, function errorCallback(response) {
                    //           document.getElementById("debug").innerHTML = 'error '+JSON.stringify(response);
                    //      }
                    // );

                    // return req;

               }
          }

          detectService.$inject = ['$http', '$cordovaFileTransfer'];

})();
