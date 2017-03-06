(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl ($cordovaCamera, $state, $rootScope) {
    const home = this;

    home.takePicture = _ => {
    	var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
            $state.go('picValidate');
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

  };

  HomeCtrl.$inject = ['$cordovaCamera', '$state', '$rootScope'];

})();