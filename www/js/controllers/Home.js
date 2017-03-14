(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl ($cordovaCamera, $state, $rootScope) {
    const home = this;

    home.takePicture = _ => {

    	options = {
            quality         : 75,
            destinationType : Camera.DestinationType.FILE_URI,
            allowEdit       : true,
            sourceType      : Camera.PictureSourceType.CAMERA,
            encodingType    : Camera.EncodingType.JPEG,
            targetWidth     : 300,
            targetHeight    : 300,
            popoverOptions  : CameraPopoverOptions,
            saveToPhotoAlbum: false,
            cameraDirection : Camera.Direction.FRONT
        };

        $cordovaCamera.getPicture(options).then(function(base64) {
            $rootScope.imgbase64 = base64;
            $state.go('picValidate');
        }, function(err) {
            // alert('error');
        });
    }

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

        $cordovaCamera.getPicture(options).then(function(base64) {
            $rootScope.imgURI = "data:image/jpeg;base64," + base64;
            $state.go('picValidate');
        }, function(err) {
            // alert('error');
        });
    }

  };

  HomeCtrl.$inject = ['$cordovaCamera', '$state', '$rootScope'];

})();
