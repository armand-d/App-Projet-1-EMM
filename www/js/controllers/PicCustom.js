(function(){
     'use-strict';

     angular
       .module('funpics')
       .controller('PicCustomCtrl', PicCustomCtrl);

       function PicCustomCtrl($cordovaFileTransfer, $state, $rootScope, detectService, $base64, $ionicActionSheet, $localStorage){
            const picCustom = this;
            const imgUriTest = '/img/test.jpg';
            picCustom.bgImage = [];
            picCustom.imgs = [];

            picCustom.initCanvas = _ => {

               picCustom.canvas = document.getElementById('tempCanvas');
               picCustom.context = picCustom.canvas.getContext('2d');

               picCustom.initImgCanvas();

               picCustom.canvas.width = picCustom.bgImg.width;
               picCustom.canvas.height = picCustom.bgImg.height;

               picCustom.renderCanvas();

               // Permet de transformer le canvas en image
               $localStorage.imgURI = picCustom.canvas.toDataURL("image/jpg");
               picCustom.url = $localStorage.imgURI;
               // console.log(picCustom.url);

          }

            picCustom.initImgCanvas = _ => {
                 picCustom.bgImg = new Image();
                 picCustom.bgImg.src = $localStorage.imgURI;
                 picCustom.bgImage.push(picCustom.bgImg);

                 angular.forEach($localStorage.icons, function(value, key){
                    picCustom.icon = new Image();
                    picCustom.icon.src = $localStorage.icons[key];
                    picCustom.imgs.push(picCustom.icon);
                 });
            }

            picCustom.renderCanvas = _ => {
                 picCustom.context.drawImage(picCustom.bgImage[0], 0, 0, 300, 300);
                 angular.forEach(picCustom.imgs, function(value, key){
                      picCustom.context.drawImage(picCustom.imgs[key], 0, 0, 100, 50);
                 });
            }

            picCustom.initCanvas();

            picCustom.back = _ => {
               $state.go('choseIcon');
            }

            picCustom.goHome = _ => {
                 $localStorage.$reset();
                 $state.go('home');
            }

            picCustom.shareImg = _ => {


            }

            // ActionSheet
            picCustom.show = _ => {
                 var hideSheet = $ionicActionSheet.show({
                      buttons: [
                           { text: '<b>Enregistrer</b> la photo' },
                           { text: '<b>Partager</b> la photo' },
                      ],
                      destructiveText: 'Supprimer',
                      titleText: 'Enregistrer la photo',
                      cancelText: 'Annuler',
                      cancel: function() {

                      },
                      buttonClicked: function(index) {
                         //   Canvas2Image.saveAsJPEG(picCustom.canvas, picCustom.canvas.width, picCustom.canvas.height);
                         //   return true;
                      },
                      destructiveButtonClicked: function() {
                         $state.go('home');
                         $localStorage.$reset();
                         return true;
                      }
                 });
            }
       };

       PicCustomCtrl.$inject = ['$cordovaFileTransfer', '$state', '$rootScope', 'detectService', '$base64', '$ionicActionSheet', '$localStorage'];
})();
