// Ionic Starter App

angular.module('cwb', ['ionic', 'cwb.controllers', 'cwb.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.battles', {
            url: '/battles',
            views: {
                'menuContent': {
                    templateUrl: 'templates/battles.html',
                    controller: 'BattlesCtrl'
                }
            }
        })
        .state('app.scenarios', {
        	url: '/scenarios/:battleId',
            views: {
            	'menuContent': {
                	templateUrl: 'templates/scenarios.html',
                    controller: 'ScenariosCtrl'
				}
            }
        })
        
        // setup an abstract state for the tabs directive
        .state('app.scenario', {
        	url: '/scenario/:scenarioId',
            abstract: true,
            views: {
            	'menuContent': {
            		templateUrl: 'templates/scenario.html',
	                controller: 'ScenarioCtrl'
				}
            }                    
        })
        .state('app.scenario.turn', {
        	url: '/turn',
            templateUrl: 'templates/scenario-tab-turn.html',
            controller: 'ScenarioTurnCtrl'
		})
        .state('app.scenario.orders', {
        	url: '/orders',
            templateUrl: 'templates/scenario-tab-orders.html',
            controller: 'ScenarioOrdersCtrl'
		});
            
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/battles');
    });
