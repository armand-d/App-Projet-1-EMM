(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('PicValidateCtrl', PicValidateCtrl);

  function PicValidateCtrl ($state, $rootScope) {
    const picValidate = this;

    console.log($rootScope.imgURI);
  };

  PicValidateCtrl.$inject = ['$state', '$rootScope'];

})();