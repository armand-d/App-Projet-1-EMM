(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

  function PicValidateCtrl ($state, $rootScope) {
    const picValidate = this;

    picValidate.back = _ => {
    	$state.go('home');
    }

  };

  PicValidateCtrl.$inject = ['$state', '$rootScope'];

})();