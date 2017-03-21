(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

  function PicValidateCtrl ($state, $rootScope, FacePpAPI, $localStorage, $cordovaFileTransfer) {
    const picValidate = this;

    picValidate.init = _ => {
      picValidate.imgURI = $localStorage.imgURI;
      return picValidate.imgURI;
    }

    picValidate.goChoseIcon = _ => {
      FacePpAPI.detect($localStorage.imgURI)
      .then(function(response) {
        var face_token = JSON.parse(JSON.stringify(JSON.parse(response).faces[0])).face_token;
        $localStorage.faceToken = face_token;
        $state.go('choseIcon');
      });
    }

    picValidate.backHome = _ => {
         $state.go('home');
    }

  };

  PicValidateCtrl.$inject = ['$state', '$rootScope', 'FacePpAPI', '$localStorage', '$cordovaFileTransfer'];

})();
