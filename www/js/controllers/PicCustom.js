(function(){
     'use-strict';

     angular
       .module('funpics')
       .controller('PicCustomCtrl', PicCustomCtrl);

       function PicCustomCtrl($state, $rootScope, detectService, $base64){
            const picCustom = this;
            const imgUriTest = '/img/test.jpg';


            function getDataUri(url, callback) {
                var image = new Image();

                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = this.naturalWidth;
                    canvas.height = this.naturalHeight;
                    canvas.getContext('2d').drawImage(this, 0, 0);
                    callback(canvas.toDataURL('image/jpeg'));
                };
                image.src = url;
            }

            getDataUri(imgUriTest, function(dataBase64) {
              
              $rootScope.imgbase64 = 'https://www.coutdgalere.com/wp-content/uploads/2017/02/lemonn-way-logo.jpg';
              
              detectService.detect($rootScope.imgbase64).then(function(response){

              });
            });

            picCustom.back = _ => {
               $state.go('choseIcon');
            }

            picCustom.goHome = _ => {
                 $state.go('home');
            }

       };

       PicCustomCtrl.$inject = ['$state', '$rootScope', 'detectService', '$base64'];
})();
