(function(){
     'use strict';

     var app = angular.module('funpics', ['ionic', 'ui.router']);

     app.config(function($stateProvider, $urlRouterProvider){
          $stateProvider
               .state({
                    name: 'home',
                    url: '/home',
                    templateUrl: 'templates/home.html',
               });

          // If none of the above states are matched, fallback :
          $urlRouterProvider.otherwise('home');
     })

})();
