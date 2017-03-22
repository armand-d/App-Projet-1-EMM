(function(){
     'use-strict';

     angular
       .module('funpics')
       .controller('PicCustomCtrl', PicCustomCtrl);

       function PicCustomCtrl($cordovaFileTransfer, $state, $rootScope, FacePpAPI, $ionicActionSheet, $localStorage){
            const picCustom = this;
            const imgUriTest = '/img/test.jpg';
            picCustom.dataFace = "";
            picCustom.bgImage = [];
            picCustom.imgs = [];

            var faceLandmark = $localStorage.faceLandmark;
            var faceAttributes = $localStorage.faceAttributes;
            // console.log(faceLandmark);
            // console.log(faceAttributes);

            // pour le calcul de la hauteur des lunettes
            var left_eye_bottom = faceLandmark.left_eye_bottom;
            var left_eyebrow_upper_middle = faceLandmark.left_eyebrow_upper_middle;
            //
            // Calcul du centre entre les yeux
            var left_eye_center = faceLandmark.left_eye_center;
            var right_eye_center = faceLandmark.right_eye_center;

            var widtheyeX = right_eye_center.x - left_eye_center.x;
            var eyeCenterX = left_eye_center.x + (widtheyeX/2);

            if (right_eye_center.y > left_eye_center.y){  
              var val_1 = right_eye_center.y;
              var val_2 = left_eye_center.y;
            } else {
              var val_1 = left_eye_center.y;
              var val_2 = right_eye_center.y;
            }
            var heigtheyeY = val_1 - val_2;
            var eyeCenterY = val_2 + (heigtheyeY/2);
            //

            picCustom.initCanvas = _ => {

               picCustom.canvas = document.getElementById('tempCanvas');
               picCustom.context = picCustom.canvas.getContext('2d');

               picCustom.initImgCanvas();

               picCustom.canvas.width = 300;
               picCustom.canvas.height = 300;

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
                 picCustom.context.clearRect(0, 0, picCustom.canvas.width, picCustom.canvas.height);
                 picCustom.context.drawImage(picCustom.bgImage[0], 0, 0, 300, 300);
                 angular.forEach(picCustom.imgs, function(value, key){
                      // dessin des icons + position (et calcul de ratio à faire + rotation)
                      picCustom.context.save();
                      var centerX = eyeCenterX;
                      var centerY = eyeCenterY;

                      var width = (right_eye_center.x - left_eye_center.x)*2;
                      var height = (left_eye_bottom.y - left_eyebrow_upper_middle.y)*1.5;

                      var BC = eyeCenterY - right_eye_center.y;
                      var AB = Math.sqrt(Math.pow((eyeCenterX - right_eye_center.x), 2) + Math.pow((eyeCenterY - right_eye_center.y), 2));
                      var cosA = BC/AB;

                      picCustom.context.translate(centerX, centerY);
                      picCustom.context.rotate(-cosA);

                      picCustom.context.drawImage(picCustom.imgs[key], -width/2, -height/2, width, height);

                      picCustom.context.restore();
                      //
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
                         $localStorage.$reset();
                         $state.go('home');
                         return true;
                      }
                 });
              }
       };

       PicCustomCtrl.$inject = ['$cordovaFileTransfer', '$state', '$rootScope', 'FacePpAPI', '$ionicActionSheet', '$localStorage'];
})();
