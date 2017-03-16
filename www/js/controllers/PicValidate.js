(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

  function PicValidateCtrl ($state, $rootScope) {
    const picValidate = this;
    $rootScope.imgURI = 'img/test.png';
    picValidate.imgURI = $rootScope.imgURI;
    console.log(picValidate.imgURI);

    picValidate.goChoseIcon = _ => {
         $state.go('choseIcon');
    }

    picValidate.backHome = _ => {
         $state.go('home');
    }

  };

  PicValidateCtrl.$inject = ['$state', '$rootScope'];

})();
