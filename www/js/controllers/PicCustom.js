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

            // à nettoyer object (ex : var glassesPos = {...})

            console.log($localStorage.faceData);

          //   var noseContourLowerMiddle = $localStorage.faceData.nose_contour_lower_middle;
          //   var leftEye_leftCorner = $localStorage.faceData.left_eye_left_corner;
          //   var rightEye_rightCorner = $localStorage.faceData.right_eye_right_corner;
          //   var leftEyebrow_upperMiddle = $localStorage.faceData.left_eyebrow_upper_middle;

            var faceLandmark = $localStorage.faceLandmark;
            var faceAttributes = $localStorage.faceAttributes;
            console.log(faceLandmark);
            console.log(faceAttributes);

            // var leftEye_leftCorner = faceLandmark.left_eye_left_corner;
            // var rightEye_rightCorner = faceLandmark.right_eye_right_corner;
            // var leftEyebrow_upperMiddle = faceLandmark.left_eyebrow_upper_middle;

            var left_eye_center = faceLandmark.left_eye_center;
            var right_eye_center = faceLandmark.right_eye_center;
            //

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
                 picCustom.context.drawImage(picCustom.bgImage[0], 0, 0, 300, 300);
                 angular.forEach(picCustom.imgs, function(value, key){
                      // dessin des icons + position (et calcul de ratio à faire + rotation)
                      picCustom.context.save();
                      // var centerX = leftEye_leftCorner.x + (rightEye_rightCorner.x - leftEye_leftCorner.x)/2;
                      // var centerY = leftEyebrow_upperMiddle.y + 25;
                      var centerX = eyeCenterX;
                      var centerY = eyeCenterY;
                      // var angle = (faceAttributes.headpose.pitch_angle*Math.PI/180)*faceAttributes.headpose.roll_angle;
                      // console.log(faceAttributes.headpose.roll_angle*Math.PI/180);
                      picCustom.context.fillStyle="#0050ff";
                      picCustom.context.fillRect(left_eye_center.x-2,left_eye_center.y-2,4,4);
                      picCustom.context.fillRect(right_eye_center.x-2,right_eye_center.y-2,4,4);
                      picCustom.context.fillRect(centerX,centerY,2,2);

                      picCustom.context.translate(centerX, centerY);
                      picCustom.context.rotate(faceAttributes.headpose.roll_angle*Math.PI/180);
                      var centerXprim = (centerX*Math.cos(faceAttributes.headpose.roll_angle*Math.PI/180) + centerY*Math.sin(faceAttributes.headpose.roll_angle*Math.PI/180));
                      var centerYprim = -centerX*Math.sin(faceAttributes.headpose.roll_angle*Math.PI/180)+centerY*Math.cos(faceAttributes.headpose.roll_angle*Math.PI/180);
                      picCustom.context.translate(centerXprim, centerYprim);

                      picCustom.context.drawImage(picCustom.imgs[key], left_eye_center.x - 40, eyeCenterY-25, (right_eye_center.x - (left_eye_center.x - 80)), 50);

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
                         //
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
