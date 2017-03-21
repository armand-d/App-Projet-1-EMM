(function(){
     'use strict';

     angular
          .module('funpics')
          .service('analyzeService', analyzeService);

          function analyzeService($http){
               const API_ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/face/analyze';
               const API_KEY = '7We0L8i3Of2abfc68uIPkXC3JTekrW_a';
               const API_SECRET = 'f46OmLDTJyqjrnUZxZlopPMJg-65W23O';


          }

          analyzeService.$inject = ['$http'];

})();
