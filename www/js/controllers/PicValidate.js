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
      .then(function(success){
        // document.getElementById("debug").innerHTML = 'success'+JSON.stringify(success);
        // alert('success validate');
        // $state.go('choseIcon');
      },function(error){
        // document.getElementById("debug").innerHTML = 'success'+JSON.stringify(error);
        // alert('error validate');

      });


    }

    picValidate.backHome = _ => {
         $state.go('home');
    }

  };

  PicValidateCtrl.$inject = ['$state', '$rootScope', 'detectService', '$localStorage', '$cordovaFileTransfer'];

})();
