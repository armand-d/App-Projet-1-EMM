(function(){
    'use-strict';

    angular
    .module('funpics')
    .controller('ChoseIconCtrl', ChoseIconCtrl);

    function ChoseIconCtrl ($state, $rootScope, $localStorage, $cordovaFileTransfer) {
        const choseIcon = this;

        // Tableau des icônes
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


        choseIcon.back = _ => {
            $state.go('picValidate');
        }

        // Traitement du choix des icons
        choseIcon.selectIcon = (id, type) => {
            angular.forEach(choseIcon.data, function(value, key){
                if (value.id == id && value.type == type) {
                      value.checked = true;
                } else if(value.type == type) {
                      value.checked = false;
                }
            });
        }

        choseIcon.resetIcons = _ => {
            $('input[type="radio"]').prop('select', 'false');
        }

        // Injection des icônes séléctionnés dans un tableau
        $rootScope.icons = [];
        choseIcon.goPicCustom = _ => {
            angular.forEach(choseIcon.data, function(value, key){
                if(value.checked == true){
                    $rootScope.icons.unshift(value);
                }
            });
            $state.go('picCustom');
        }

    };

    ChoseIconCtrl.$inject = ['$state', '$rootScope', '$localStorage', '$cordovaFileTransfer'];

})();
