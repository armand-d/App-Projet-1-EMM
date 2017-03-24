(function(){
     'use strict';

  var app = angular.module('funpics', ['ionic', 'ui.router', 'ngCordova', 'ngCookies', 'ngStorage'])

  .run(function($ionicPlatform, $http, $cookies) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider){

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
