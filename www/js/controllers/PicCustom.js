(function(){
     'use-strict';

     angular
       .module('funpics')
       .controller('PicCustomCtrl', PicCustomCtrl);

       function PicCustomCtrl($state, $rootScope, detectService, $base64){
            const picCustom = this;
          //   const imgUriTest = '/img/test.jpg';
            picCustom.imgs = [];

            picCustom.initCanvas = _ => {

               picCustom.canvas = document.getElementById('tempCanvas');
               picCustom.context = picCustom.canvas.getContext('2d');

               picCustom.initImgCanvas();

               picCustom.canvas.width = picCustom.bgImg.width;
               picCustom.canvas.height = picCustom.bgImg.height;

               picCustom.renderCanvas();


               // picCustom.canvas.toBlob(function(blob){
               //      picCustom.url = URL.createObjectURL(blob);
               //      $rootScope.imgURI = picCustom.url;
               //      console.log($rootScope.imgURI);
               // });

               // Permet de transformer le canvas en image
               $rootScope.imgURI = picCustom.canvas.toDataURL();

            }

            picCustom.initImgCanvas = _ => {
                 picCustom.bgImg = new Image();
                 picCustom.bgImg.src = $rootScope.imgURI;
                 picCustom.imgs.push(picCustom.bgImg);

                 picCustom.icon = new Image();
                 picCustom.icon.src = $rootScope.icons;
                 picCustom.imgs.push(picCustom.icon);
            }

            picCustom.renderCanvas = _ => {
                 picCustom.context.drawImage(picCustom.imgs[0], 0, 0, 325, 325);
                 picCustom.context.drawImage(picCustom.imgs[1], 110, 210, 100, 50);
            }

            picCustom.initCanvas();

          //   function getDataUri(url, callback) {
          //       var image = new Image();
            //
          //       image.onload = function () {
          //           var canvas = document.createElement('canvas');
          //           canvas.width = this.naturalWidth;
          //           canvas.height = this.naturalHeight;
          //           canvas.getContext('2d').drawImage(this, 0, 0);
          //           callback(canvas.toDataURL('image/jpeg'));
          //       };
          //       image.src = url;
          //   }

          //   getDataUri(imgUriTest, function(dataBase64) {
            //
              $rootScope.imgbase64 = 'https://www.coutdgalere.com/wp-content/uploads/2017/02/lemonn-way-logo.jpg';

          detectService.detect($rootScope.imgbase64).then(function(response){

          });
          //   });

            picCustom.back = _ => {
               $state.go('choseIcon');
            }

            picCustom.goHome = _ => {
                 $state.go('home');
            }

            picCustom.shareImg = _ => {
               // Console.log - URI du canvas transformé en png
            //    console.log($rootScope.imgURI);
            }


       };

       PicCustomCtrl.$inject = ['$state', '$rootScope', 'detectService', '$base64'];
})();
