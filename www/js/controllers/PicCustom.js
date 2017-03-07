(function(){
     'use-strict';

     angular
       .module('funpics')
       .controller('PicCustomCtrl', PicCustomCtrl);

       function PicCustomCtrl($state, $rootScope){
            const picCustom = this;

            picCustom.back = _ => {
               $state.go('choseIcon');
            }

            picCustom.goHome = _ => {
                 $state.go('home');
            }

       };

       PicCustomCtrl.$inject = ['$state', '$rootScope'];
})();
