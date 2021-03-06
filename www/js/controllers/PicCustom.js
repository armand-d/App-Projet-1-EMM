(function(){
     'use-strict';

     angular
     .module('funpics')
     .controller('PicCustomCtrl', PicCustomCtrl);

     function PicCustomCtrl($cordovaFileTransfer, $state, $rootScope, FacePpAPI, $localStorage){
          const picCustom = this;

          picCustom.bgImg = [];
          picCustom.icon = [];

          $state.reload();

          var faceLandmark = $rootScope.faceLandmark;
          var faceAttributes = $rootScope.faceAttributes;

          // glasses
          var left_eye_bottom = faceLandmark.left_eye_bottom;
          var left_eyebrow_upper_middle = faceLandmark.left_eyebrow_upper_middle;

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

          // moustaches
          var mouth_upper_lip_top = faceLandmark.mouth_upper_lip_top;
          var nose_contour_lower_middle = faceLandmark.nose_contour_lower_middle;

          var mouth_right_corner = faceLandmark.mouth_right_corner;
          var mouth_left_corner = faceLandmark.mouth_left_corner;

          // hats
          var contour_left1 = faceLandmark.contour_left1;
          var contour_right1 = faceLandmark.contour_right1;
          var contour_chin = faceLandmark.contour_chin;

          picCustom.initCanvas = _ => {
               picCustom.canvas = document.getElementById('tempCanvas');
               picCustom.context = picCustom.canvas.getContext('2d');

               picCustom.canvas.width = 300;
               picCustom.canvas.height = 300;

               picCustom.renderCanvas();
               // Permet de transformer le canvas en image
               $rootScope.img = picCustom.canvas.toDataURL("image/jpg");
          }

          picCustom.renderCanvas = _ => {

               picCustom.context.clearRect(0, 0, picCustom.canvas.width, picCustom.canvas.height);

               picCustom.context.save();

               picCustom.bgImg = new Image();
               picCustom.bgImg.src = $rootScope.img;
               picCustom.context.drawImage(picCustom.bgImg, 0, 0, 300, 300);

               picCustom.context.restore();

               angular.forEach($rootScope.icons, function(value){

                    var BC = eyeCenterY - right_eye_center.y;
                    var AB = Math.sqrt(Math.pow((eyeCenterX - right_eye_center.x), 2) + Math.pow((eyeCenterY - right_eye_center.y), 2));
                    var angle_A = BC/AB;

                    if (value.type == 'glasses') {
                         picCustom.context.save();

                         var centerX = eyeCenterX;
                         var centerY = eyeCenterY;

                         var width = (right_eye_center.x - left_eye_center.x)*2;
                         var height = (left_eye_bottom.y - left_eyebrow_upper_middle.y)*1.5;


                         picCustom.context.translate(centerX, centerY);
                         picCustom.context.rotate(-angle_A);

                         picCustom.icon = new Image();
                         picCustom.icon.src = value.url;
                         picCustom.context.drawImage(picCustom.icon, -width/2, -height/2, width, height);

                         picCustom.context.restore();
                    }

                    if (value.type == 'mustaches') {
                         picCustom.context.save();

                         var width = mouth_right_corner.x - mouth_left_corner.x;
                         var height = mouth_upper_lip_top.y - nose_contour_lower_middle.y;

                         var centerX = mouth_upper_lip_top.x;
                         var centerY = nose_contour_lower_middle.y + (height/2);

                         picCustom.context.translate(centerX, centerY);
                         picCustom.context.rotate(-angle_A);

                         picCustom.icon = new Image();
                         picCustom.icon.src = value.url;
                         picCustom.context.drawImage(picCustom.icon, -width/2, -height/2, width, height);

                         picCustom.context.restore();
                    }

                    if (value.type == 'hats') {
                         picCustom.context.save();

                         var width = contour_right1.x - contour_left1.x;
                         var height = (contour_chin.y - nose_contour_lower_middle.y)*1.1;

                         var centerX = contour_left1.x + (width/2);
                         var centerY = eyeCenterY;

                         picCustom.context.translate(centerX, centerY);
                         picCustom.context.rotate(-angle_A);

                         picCustom.icon = new Image();
                         picCustom.icon.src = value.url;
                         picCustom.context.drawImage(picCustom.icon, -(width*1.3)/2, -height*2, (width*1.3), height*1.3);

                         picCustom.context.restore();
                    }
               });
          }

          picCustom.initCanvas();

          picCustom.goHome = _ => {
               $rootScope.faceLandmark = null;
               $rootScope.faceAttributes = null;
               $rootScope.img = null;
               $rootScope.icons = null;
               $state.go('home');
          }

          picCustom.save = _ => {}

     }

     PicCustomCtrl.$inject = ['$cordovaFileTransfer', '$state', '$rootScope', 'FacePpAPI', '$localStorage'];

})();
