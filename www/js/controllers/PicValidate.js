(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

  function PicValidateCtrl ($state, $rootScope, FacePpAPI, $cordovaFileTransfer, $ionicLoading) {
    const picValidate = this;

    picValidate.goChoseIcon = _ => {
      $ionicLoading.show({
        template: 'Chargement ...'
      });
      FacePpAPI.detect($rootScope.img)
      .then(function(response) {
        var face_token = JSON.parse(JSON.stringify(JSON.parse(response).faces[0])).face_token;
        picValidate.faceToken = face_token;
        FacePpAPI.analyze(picValidate.faceToken)
        .then(function(response) {
          $rootScope.faceLandmark = response.data.faces[0].landmark;
          $rootScope.faceAttributes = response.data.faces[0].attributes;
        });
        $ionicLoading.hide();
        $state.go('choseIcon');
      });
    }

    picValidate.backHome = _ => {
      $rootScope.img = null;
      $state.go('home');
    }

  };

  PicValidateCtrl.$inject = ['$state', '$rootScope', 'FacePpAPI', '$cordovaFileTransfer', '$ionicLoading'];

})();
