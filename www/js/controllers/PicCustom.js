(function(){
     'use-strict';

     angular
       .module('funpics')
       .controller('PicCustomCtrl', PicCustomCtrl);

       function PicCustomCtrl($cordovaFileTransfer, $state, $rootScope, FacePpAPI, $base64, $ionicActionSheet, $localStorage){
            const picCustom = this;
            const imgUriTest = '/img/test.jpg';
            picCustom.dataFace = "";
            picCustom.bgImage = [];
            picCustom.imgs = [];
            
            // à nettoyer object (ex : var glassesPos = {...})
            var faceLandmark = $localStorage.faceLandmark;
            var faceAttributes = $localStorage.faceAttributes;
            console.log(faceLandmark);
            console.log(faceAttributes);

            var leftEye_leftCorner = faceLandmark.left_eye_left_corner;
            var rightEye_rightCorner = faceLandmark.right_eye_right_corner;
            var leftEyebrow_upperMiddle = faceLandmark.left_eyebrow_upper_middle;
            //

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
                      // dessin des icons + position (et calcul de ratio à faire + rotation)
                      picCustom.context.beginPath();
                      // var centerX = leftEye_leftCorner.x + (rightEye_rightCorner.x - leftEye_leftCorner.x)/2;
                      // var centerY = leftEyebrow_upperMiddle.y + 25;
                      // picCustom.context.translate(centerX, centerY);
                      picCustom.context.rotate((faceAttributes.headpose.roll_angle).toFixed(2));
                      picCustom.context.drawImage(picCustom.imgs[key], leftEye_leftCorner.x - 20, leftEyebrow_upperMiddle.y, (rightEye_rightCorner.x - (leftEye_leftCorner.x - 40)), 50);
                      picCustom.context.closePath();
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

       PicCustomCtrl.$inject = ['$cordovaFileTransfer', '$state', '$rootScope', 'FacePpAPI', '$base64', '$ionicActionSheet', '$localStorage'];
})();
