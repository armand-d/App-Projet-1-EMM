(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('ChoseIconCtrl', ChoseIconCtrl);

  function ChoseIconCtrl ($state) {
    const choseIcon = this;

    choseIcon.mustaches = [1,2,3,4];
    choseIcon.hats = [1,2,3,4];

  };

  ChoseIconCtrl.$inject = ['$state'];

})();