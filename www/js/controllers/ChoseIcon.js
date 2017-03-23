(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('ChoseIconCtrl', ChoseIconCtrl);

  function ChoseIconCtrl ($state, $rootScope, $localStorage, $cordovaFileTransfer) {
    const choseIcon = this;
    // Rempli le tableau avec les icons dans le localstorage
    choseIcon.storage = $localStorage.$default({ icons: [] });

    choseIcon.mustaches = [
      {
        id: 1,
        type: 'mustaches',
        url:'img/icons/mustache_1.svg',
        checked: false
      },
      {
        id: 2,
        type: 'mustaches',
        url:'img/icons/mustache_2.svg',
        checked: false
      }
    ];
    choseIcon.hats = [
      {
        id: 3,
        type: 'hats',
        url:'img/icons/chapeau_1.svg',
        checked: false
      },
      {
        id: 4,
        type: 'hats',
        url:'img/icons/chapeau_2.svg',
        checked: false
      }
    ];
    choseIcon.glasses = [
      {
        id: 5,
        type: 'glasses',
        url:'img/icons/lunette_1.svg',
        checked: false
      },
      {
        id: 6,
        type: 'glasses',
        url:'img/icons/lunette_2.svg',
        checked: false
      }
    ];

    choseIcon.iconsSelected = item => {
      $localStorage.icons.unshift(item);
    }

    choseIcon.back = _ => {
      $state.go('picValidate');
    }

    choseIcon.goPicCustom = _ => {
      $state.go('picCustom');
    }

  };

  ChoseIconCtrl.$inject = ['$state', '$rootScope', '$localStorage', '$cordovaFileTransfer'];

})();
