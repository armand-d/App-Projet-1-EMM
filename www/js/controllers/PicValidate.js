(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

  function PicValidateCtrl ($state, $rootScope, detectService, $localStorage, $cordovaFileTransfer) {
    const picValidate = this;

    // picValidate.storage = $localStorage.$default({ imgURI : '' });

    picValidate.init = _ => {
      // picValidate.storage.imgURI = 'img/test.png';
      picValidate.imgURI = $localStorage.imgURI;
      return picValidate.imgURI;
    }

    picValidate.goChoseIcon = _ => {
      detectService.detect($localStorage.imgURI)
      .then(function(response) {
        console.log(response);
        var face_token = JSON.parse(JSON.stringify(JSON.parse(response).faces[0])).face_token;
        console.log(face_token);
      });
    }

    picValidate.backHome = _ => {
         $state.go('home');
    }

  };

  PicValidateCtrl.$inject = ['$state', '$rootScope', 'detectService', '$localStorage', '$cordovaFileTransfer'];

})();
