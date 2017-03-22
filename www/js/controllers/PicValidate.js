(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

  function PicValidateCtrl ($state, $rootScope, FacePpAPI, $localStorage, $cordovaFileTransfer, $ionicLoading) {
    const picValidate = this;

    picValidate.init = _ => {
      picValidate.imgURI = $localStorage.imgURI;

      return picValidate.imgURI;
    }

    picValidate.goChoseIcon = _ => {
      $ionicLoading.show({
        template: 'Chargement ...'
      });
      FacePpAPI.detect($localStorage.imgURI)
      .then(function(response) {
        var face_token = JSON.parse(JSON.stringify(JSON.parse(response).faces[0])).face_token;
        $localStorage.faceToken = face_token;
        FacePpAPI.analyze($localStorage.faceToken)
        .then(function(response) {
          $localStorage.faceLandmark = response.data.faces[0].landmark;
          $localStorage.faceAttributes = response.data.faces[0].attributes;
        });
        $ionicLoading.hide();
        $state.go('choseIcon');
      });
    }

    picValidate.backHome = _ => {
         $state.go('home');
    }

  };

  PicValidateCtrl.$inject = ['$state', '$rootScope', 'FacePpAPI', '$localStorage', '$cordovaFileTransfer', '$ionicLoading'];

})();
