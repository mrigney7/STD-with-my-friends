angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('testMe', {
    url: '/page1',
    templateUrl: 'templates/testMe.html',
    controller: 'testMeCtrl'
  })

  .state('testMe2', {
    url: '/page2',
    templateUrl: 'templates/testMe2.html',
    controller: 'testMe2Ctrl'
  })

  .state('clinic4', {
    url: '/page3',
    templateUrl: 'templates/clinic4.html',
    controller: 'clinic4Ctrl'
  })

  .state('clinic5', {
    url: '/page10',
    templateUrl: 'templates/clinic5.html',
    controller: 'clinic5Ctrl'
  })

  .state('clinic1', {
    url: '/page7',
    templateUrl: 'templates/clinic1.html',
    controller: 'clinic1Ctrl'
  })

  .state('clinic2', {
    url: '/page8',
    templateUrl: 'templates/clinic2.html',
    controller: 'clinic2Ctrl'
  })

  .state('clinic3', {
    url: '/page9',
    templateUrl: 'templates/clinic3.html',
    controller: 'clinic3Ctrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});