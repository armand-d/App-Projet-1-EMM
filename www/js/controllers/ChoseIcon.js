(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('ChoseIconCtrl', ChoseIconCtrl);

  function ChoseIconCtrl ($state, $rootScope, $cordovaFileTransfer) {
    const choseIcon = this;

    choseIcon.data = [
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
      },
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
      },
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



    choseIcon.selectIcon = (id, type) => {
      angular.forEach(choseIcon.data, function(value){
        if (value.id == id && value.type == type) {
          value.checked = true;
        } else if(value.type == type) {
          value.checked = false;
        }
      });
    }

    choseIcon.goPicCustom = _ => {
      $rootScope.icons = [];
      angular.forEach(choseIcon.data, function(value){
        if(value.checked == true){
          $rootScope.icons.unshift(value);
          value.checked = false;
        }
      });

      $state.go('picCustom', {}, { reload:true });
    }

  };

  ChoseIconCtrl.$inject = ['$state', '$rootScope', '$cordovaFileTransfer'];

})();
