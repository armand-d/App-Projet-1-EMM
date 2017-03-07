(function(){
     'use strict';

     angular
          .module('funpics')
          .service('detectService', detectService);

          function detectService($http){
               const API_ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/detect';
               const API_KEY = '7We0L8i3Of2abfc68uIPkXC3JTekrW_a';
               const API_SECRET = 'f46OmLDTJyqjrnUZxZlopPMJg-65W23O';

               this.detect = function(img_uri){
                    // var config = {
                    //    params: {
                    //        output: 'jsonp',
                    //    },
                    //    jsonpCallbackParam: 'callback'
                    // };
                    var i = img_uri;
                    // return $http.jsonp(API_ENDPOINT + 'signup/'+u+'/'+p+'?callback=JSON_CALLBACK', config);
                    return $http.jsonp(API_ENDPOINT+'?api_key='+API_KEY+'&api_secret='+API_SECRET+'&image_url='+i+'&callback=JSON_CALLBACK');
               }




          }

          detectService.$inject = ['$http'];

})();
