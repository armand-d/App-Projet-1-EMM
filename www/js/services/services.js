(function(){
     'use strict';

     angular
          .module('funpics')
          .service('funpicsService', funpicsService);

          function funpicsService($http){
               const API_ENDPOINT = 'https://api-us.faceplusplus.com/facepp/v3/detect';
               const API_KEY = '7We0L8i3Of2abfc68uIPkXC3JTekrW_a';
               const API_SECRET = 'f46OmLDTJyqjrnUZxZlopPMJg-65W23O';
               const IMG_URI = '';



          }

          funpicsService.$inject = ['$http'];

})();
