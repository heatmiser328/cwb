angular.module('cwb', ['ionic', 'cwb.controllers', 'cwb.services', 'cwb.directives'])

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
            controller: 'MainCtrl'
        })
        .state('app.home', {
            url: '/home',
            views: {
                'contentView': {
                    templateUrl: 'templates/main.html'
                }
            }
        })

        // setup an abstract state for the tabs directive
        .state('app.scenario', {
        	url: '/scenario/:scenarioId',
            abstract: true,
            views: {
            	'contentView': {
            		templateUrl: 'templates/scenario.html',
	                controller: 'ScenarioCtrl'
				}
            }                    
        })
        .state('app.scenario.turn', {
        	url: '/turn',
            views: {
            	'scenario-turn': {
		            templateUrl: 'templates/scenario-tab-turn.html',
    		        controller: 'ScenarioTurnCtrl'
				}               
			}               
		})
        .state('app.scenario.orders', {
        	url: '/orders',
            views: {
            	'scenario-orders': {
		            templateUrl: 'templates/scenario-tab-orders.html',
		            controller: 'ScenarioOrdersCtrl'
                }
            }
		})
        
        .state('app.scenario.roster', {
        	url: '/roster',
            views: {
            	'scenario-roster': {
		            templateUrl: 'templates/scenario-tab-roster.html',
		            controller: 'ScenarioRosterCtrl'
                }
            }
		})

        .state('app.scenario.fire', {
            url: '/fire',
            views: {
                'scenario-fire': {
                    templateUrl: 'templates/scenario-tab-fire.html',
                    controller: 'ScenarioFireCtrl'
                }
            }
        })

        .state('app.scenario.melee', {
            url: '/melee',
            views: {
                'scenario-melee': {
                    templateUrl: 'templates/scenario-tab-melee.html',
                    controller: 'ScenarioMeleeCtrl'
                }
            }
        })

        .state('app.scenario.morale', {
            url: '/morale',
            views: {
                'scenario-morale': {
                    templateUrl: 'templates/scenario-tab-morale.html',
                    controller: 'ScenarioMoraleCtrl'
                }
            }
        })

        ;
            
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
