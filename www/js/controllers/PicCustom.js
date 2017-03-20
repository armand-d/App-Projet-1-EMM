(function(){
     'use-strict';

     angular
       .module('funpics')
       .controller('PicCustomCtrl', PicCustomCtrl);

       function PicCustomCtrl($state, $rootScope, detectService, $base64, $ionicActionSheet){
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
               $rootScope.imgURI = picCustom.canvas.toDataURL("image/png");
               console.log($rootScope.imgURI);
          }

            picCustom.initImgCanvas = _ => {
                 picCustom.bgImg = new Image();
                 picCustom.bgImg.src = $rootScope.imgURI;
                 picCustom.bgImage.push(picCustom.bgImg);
                 angular.forEach($rootScope.icons, function(value, key){
                    picCustom.icon = new Image();
                    picCustom.icon.src = $rootScope.icons[key];
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
                           return true;
                      },
                      destructiveButtonClicked: function() {
                         $state.go('home');
                         return true;
                      }
                 });
            }
       };

       PicCustomCtrl.$inject = ['$state', '$rootScope', 'detectService', '$base64', '$ionicActionSheet'];
})();
