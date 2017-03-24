(function(){
    'use-strict';

    angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

    function PicValidateCtrl ($state, $rootScope, FacePpAPI, $localStorage, $cordovaFileTransfer, $ionicLoading) {
        const picValidate = this;

        // Récupération de l'image séléctionnée en page d'accueil
        picValidate.init = _ => {
            picValidate.imgURI = $localStorage.imgURI;
            return picValidate.imgURI;
        }

        picValidate.goChoseIcon = _ => {
            // Mise en place d'un loader
            $ionicLoading.show({
                template: 'Chargement ...'
            });

            // Appel API pour la Détection et Analyse de l'image
            FacePpAPI.detect($localStorage.imgURI).then(function(response) {

                // Récupération et stockage du face_token
                var face_token = JSON.parse(JSON.stringify(JSON.parse(response).faces[0])).face_token;
                $localStorage.faceToken = face_token;

                // Récupération et stockage des landmarks
                FacePpAPI.analyze($localStorage.faceToken).then(function(response) {
                    $localStorage.faceLandmark = response.data.faces[0].landmark;
                    $localStorage.faceAttributes = response.data.faces[0].attributes;
                });

                // Une fois l'appel effectué on cache le loader
                $ionicLoading.hide();
                $state.go('choseIcon');
            });
        }

        picValidate.backHome = _ => {
            $state.go('home');
        }

    };

    // Injection des dépendances utilisées dans le controller
    PicValidateCtrl.$inject = ['$state', '$rootScope', 'FacePpAPI', '$localStorage', '$cordovaFileTransfer', '$ionicLoading'];

})();
