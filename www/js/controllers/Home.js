(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl ($cordovaCamera, $state, $rootScope, funpicsService) {
    const home = this;

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
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
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

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
            $state.go('picValidate');
        }, function(err) {
            // alert('error');
        });
    }

  };

  HomeCtrl.$inject = ['$cordovaCamera', '$state', '$rootScope', 'funpicsService'];

})();
