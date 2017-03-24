(function(){
    'use-strict';

    angular
    .module('funpics')
    .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl ($cordovaCamera, $state, $rootScope, $localStorage) {
        const home = this;

        // Le localStorage est effacé quand l'utilisateur se retrouve sur la page d'accueil
        $localStorage.$reset();
        // Création du contenu par défaut du localstorage
        home.storage = $localStorage.$default({ imgURI : '' , faceToken : '', faceLandmark : '' });

        // Fonction pour prendre une photo
        home.takePicture = _ => {
            options = {
            quality         : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            allowEdit       : true,
            sourceType      : Camera.PictureSourceType.CAMERA,
            encodingType    : Camera.EncodingType.JPEG,
            targetWidth     : 300,
            targetHeight    : 300,
            popoverOptions  : CameraPopoverOptions,
            saveToPhotoAlbum: false,
            cameraDirection : Camera.Direction.FRONT
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
                // Stockage de l'image dans le localstorage pour la récupérer dans le picValidate
                home.storage.imgURI = "data:image/jpeg;base64," + imageData;
                $state.go('picValidate');
            }, function(err) {
                alert("La photo n'a pas pu être prise.");
            });
        }

        // Fonction pour le choix d'une photo dans la librairie du téléphone
        home.takeLibrary = _ => {
            options = {
            quality         : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            allowEdit       : true,
            sourceType      : Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType    : Camera.EncodingType.JPEG,
            targetWidth     : 300,
            targetHeight    : 300,
            popoverOptions  : CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
                // Stockage de l'image dans le localstorage pour la récupérer dans le picValidate
                home.storage.imgURI = "data:image/jpeg;base64," + imageData;
                $state.go('picValidate');
            }, function(err) {
                alert("Nous n'avons pas pu accéder à votre librairie");
            });
        }

    };

    // Injection des dépendances utilisées dans le controller
    HomeCtrl.$inject = ['$cordovaCamera', '$state', '$rootScope', '$localStorage'];

})();
