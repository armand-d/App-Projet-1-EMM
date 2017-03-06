(function(){
  'use-strict';

  angular
    .module('funpics')
    .controller('ChoseIconCtrl', ChoseIconCtrl);

  function ChoseIconCtrl ($state) {
    const choseIcon = this;

    // Data à mettre dans un autre fichier 
    choseIcon.data = {
      mustaches : {
        title : 'Moustache',
        data : {
          mustache_1: {id: 1, url:'img/icons/mustache_1.svg'},
          mustache_2: {id: 2,url:'img/icons/mustache_2.svg'},
        }
      },
      hats : {
        title : 'Chapeaux',
        data : {
          hat_1: {id: 1, url:'img/icons/mustache_1.svg'},
          hat_2: {id: 2,url:'img/icons/mustache_2.svg'},
        }
      }
    };
    // fin data

    choseIcon.change = item => {
      if(choseIcon.confirmed[item]) {
        console.log('add '+item);
      } else {
        console.log('remove '+item);
      }
    }

    choseIcon.back = _ => {
      $state.go('picValidate');
    }

  };

  ChoseIconCtrl.$inject = ['$state'];

})();