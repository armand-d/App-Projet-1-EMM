(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('ChoseIconCtrl', ChoseIconCtrl);

  function ChoseIconCtrl ($state, $rootScope, $localStorage, $cordovaFileTransfer) {
    const choseIcon = this;

    // Data à mettre dans un autre fichier / firebase
    choseIcon.data = {
      mustaches : {
        title : 'Moustaches',
        data : {
          mustache_1: {id: 1, type: 'moustaches', url:'img/icons/mustache_1.svg'},
          mustache_2: {id: 2, type: 'moustaches', url:'img/icons/mustache_2.svg'},
        }
      },
      hats : {
        title : 'Chapeaux',
        data : {
          hat_1: {id: 3, type: 'chapeaux', url:'img/icons/chapeau_1.svg'},
          hat_2: {id: 4, type: 'chapeaux', url:'img/icons/chapeau_2.svg'},
        }
      },
      glasses : {
        title : 'Lunettes',
        data : {
          glasses_1: {id: 5, type: 'lunettes', url:'img/icons/lunette_1.svg'},
          glasses_2: {id: 6, type: 'lunettes', url:'img/icons/lunette_2.svg'},
        }
      }
    };
    // fin data

    choseIcon.change = (item, url, type) => {
      if(choseIcon.confirmed[item]) {
        // console.log('add '+item);
        $localStorage.icons.unshift(url);
      } else {
        // console.log('remove '+item);
        $localStorage.icons.shift(url);
      }
    }


    choseIcon.back = _ => {
      $state.go('picValidate');
    }

    choseIcon.goPicCustom = _ => {
      $state.go('picCustom');
    //   choseIcon.imgURI = $rootScope.imgURI;
    //   $rootScope.img = 'img/test.png';

    }

  };

  ChoseIconCtrl.$inject = ['$state', '$rootScope', '$localStorage', '$cordovaFileTransfer'];

})();
