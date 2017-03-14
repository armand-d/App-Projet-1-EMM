(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

  function PicValidateCtrl ($state, $rootScope) {
    const picValidate = this;

    picValidate.goChoseIcon = _ => {
      $state.go('choseIcon');
    }

    picValidate.backHome = _ => {
         $state.go('home');
    }

  };

  PicValidateCtrl.$inject = ['$state', '$rootScope'];

})();
