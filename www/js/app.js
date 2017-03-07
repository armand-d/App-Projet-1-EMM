(function(){
     'use strict';

  var app = angular.module('funpics', ['ionic', 'ui.router', 'ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider){
      $stateProvider
           .state({
                name          : 'home',
                url           : '/home',
                templateUrl   : 'templates/home.html',
                controller    : 'HomeCtrl',
                controllerAs  : 'home'
           })
           .state({
                name          : 'picValidate',
                url           : '/pic-validate',
                templateUrl   : 'templates/pic-validate.html',
                controller    : 'PicValidateCtrl',
                controllerAs  : 'picValidate'
           })
           .state({
                name          : 'choseIcon',
                url           : '/chose-icon',
                templateUrl   : 'templates/chose-icon.html',
                controller    : 'ChoseIconCtrl',
                controllerAs  : 'choseIcon'
           })
           .state({
               name           : 'picCustom',
               url            : '/pic-custom',
               templateUrl    : 'templates/pic-custom.html',
               controller     : 'PicCustomCtrl',
               controllerAs   : 'picCustom' 
           });

      $urlRouterProvider.otherwise('home');
  })
})();
