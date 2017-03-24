(function(){
    'use-strict';

    angular
    .module('funpics')
    .controller('PicCustomCtrl', PicCustomCtrl);

    function PicCustomCtrl($cordovaFileTransfer, $state, $rootScope, FacePpAPI, $localStorage){
        const picCustom = this;

        picCustom.bgImage = [];
        picCustom.imgs = [];

        // Récupération des landmarks et attributs
        var faceLandmark = $localStorage.faceLandmark;
        var faceAttributes = $localStorage.faceAttributes;

        // ----- LUNETTES -----

        var left_eye_bottom = faceLandmark.left_eye_bottom;
        var left_eyebrow_upper_middle = faceLandmark.left_eyebrow_upper_middle;

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

        // ----- MOUSTACHES -----


        var mouth_upper_lip_top = faceLandmark.mouth_upper_lip_top;
        var nose_contour_lower_middle = faceLandmark.nose_contour_lower_middle;

        // Pour connaître la largeur de la moustache
        var mouth_right_corner = faceLandmark.mouth_right_corner;
        var mouth_left_corner = faceLandmark.mouth_left_corner;

        // ----- CHAPEAUX -----

        var contour_left1 = faceLandmark.contour_left1;
        var contour_right1 = faceLandmark.contour_right1;
        var contour_chin = faceLandmark.contour_chin;

        picCustom.initCanvas = _ => {

            // Création de l'élément Canvas
            picCustom.canvas = document.getElementById('tempCanvas');
            picCustom.context = picCustom.canvas.getContext('2d');

            picCustom.initBackground();

            picCustom.canvas.width = 300;
            picCustom.canvas.height = 300;

            picCustom.renderCanvas();

            // Permet de transformer le canvas en image
            $localStorage.imgURI = picCustom.canvas.toDataURL("image/jpg");

        }

        // Initialisation du background avec la photo choisie
        picCustom.initBackground = _ => {
            picCustom.bgImg = new Image();
            picCustom.bgImg.src = $localStorage.imgURI;
            picCustom.bgImage.push(picCustom.bgImg);
        }

        // Intégration du background et des icônes sur le canvas
        picCustom.renderCanvas = _ => {

            // Background - Photo
            picCustom.context.clearRect(0, 0, picCustom.canvas.width, picCustom.canvas.height);
            picCustom.context.drawImage(picCustom.bgImage[0], 0, 0, 300, 300);

            // Icônes
            angular.forEach($rootScope.icons, function(value, key){

                // Si le visage est penché - utlise pour la rotation des icônes
                var BC = eyeCenterY - right_eye_center.y;
                var AB = Math.sqrt(Math.pow((eyeCenterX - right_eye_center.x), 2) + Math.pow((eyeCenterY - right_eye_center.y), 2));
                var angle_A = BC/AB;

                // ----- LUNETTES -----

                if (value.type == 'glasses') {
                    picCustom.context.save();

                    var centerX = eyeCenterX;
                    var centerY = eyeCenterY;

                    // Taille de l'icône
                    var width = (right_eye_center.x - left_eye_center.x)*2;
                    var height = (left_eye_bottom.y - left_eyebrow_upper_middle.y)*1.5;

                    // Position de l'icône
                    picCustom.context.translate(centerX, centerY);
                    picCustom.context.rotate(-angle_A);

                    // Intégration dans le canvas
                    picCustom.icon = new Image();
                    picCustom.icon.src = value.url;
                    picCustom.context.drawImage(picCustom.icon, -width/2, -height/2, width, height);

                    picCustom.context.restore();
                }

                // ----- MOUSTACHES -----

                if (value.type == 'mustaches') {
                    picCustom.context.save();

                    // Taille de l'icône
                    var width = mouth_right_corner.x - mouth_left_corner.x;
                    var height = mouth_upper_lip_top.y - nose_contour_lower_middle.y;

                    // Position de l'icône
                    var centerX = mouth_upper_lip_top.x;
                    var centerY = nose_contour_lower_middle.y + (height/2);

                    picCustom.context.translate(centerX, centerY);
                    picCustom.context.rotate(-angle_A);

                    // Intégration dans le canvas
                    picCustom.icon = new Image();
                    picCustom.icon.src = value.url;
                    picCustom.context.drawImage(picCustom.icon, -width/2, -height/2, width, height);

                    picCustom.context.restore();
                }

                // ----- CHAPEAUX -----

                if (value.type == 'hats') {
                    picCustom.context.save();

                    // Taille de l'icône
                    var width = contour_right1.x - contour_left1.x;
                    var height = (contour_chin.y - nose_contour_lower_middle.y)*1.1;

                    // Position de l'icône
                    var centerX = contour_left1.x + (width/2);
                    var centerY = eyeCenterY;

                    picCustom.context.translate(centerX, centerY);
                    picCustom.context.rotate(-angle_A);

                    // Intégration dans le canvas
                    picCustom.icon = new Image();
                    picCustom.icon.src = value.url;
                    picCustom.context.drawImage(picCustom.icon, -(width*1.3)/2, -height*2, (width*1.3), height*1.3);

                    picCustom.context.restore();
                }
            });
        }

        // Affichage du canvas avec la photo et les icônes placées dessus
        picCustom.initCanvas();

        picCustom.back = _ => {
            $state.go('choseIcon');
        }

        picCustom.goHome = _ => {
            $localStorage.$reset();
            $state.go('home');
        }

        picCustom.save = _ => {
            // A venir
        }
    };

    PicCustomCtrl.$inject = ['$cordovaFileTransfer', '$state', '$rootScope', 'FacePpAPI', '$localStorage'];

})();
