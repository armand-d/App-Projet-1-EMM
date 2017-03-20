(function(){
     'use strict';

     angular
          .module('funpics')
          .service('detectService', detectService);

          function detectService($http, $cordovaFileTransfer){

               this.detect = function(image_url){
                    const API_KEY = 'jdo9Yoh3stTB9uGkvxmxs9Vt59XEmflq';
                    const API_SECRET = '_0kMlb8z7tEJovAievoGrHZqfno5kNF7';
                    const API_ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/';

                    url = API_ENDPOINT+'detect?api_secret='+API_SECRET+'&api_key='+API_KEY;
                    
                    ft = new FileTransfer
                    
                    options = {
                         fileKey: "image_file",
                         fileName: 'filename',
                         chunkedMode: false,
                         mimeType: "image/jpeg",
                    };

                    ft.upload(image_url,encodeURI(url),function(r){
                      console.log(r);
                      document.body.innerHTML = r;
                    },function(e){
                      console.log(e);
                      document.body.innerHTML = r;
                    },options);

               }
          }

          detectService.$inject = ['$http', '$cordovaFileTransfer'];

})();
