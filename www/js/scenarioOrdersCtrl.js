angular.module('cwb.controllers')

.controller('ScenarioOrdersCtrl', function($rootScope, $scope, $log) {
	$log.info('load scenario orders controller');
    $scope.armies = [];
    
    $scope.reset = function() {
    	$rootScope.$emit('reset');
    }
    
    /*
    $scope.$watch('scenario.battle.armies', function(newValue, oldValue) {
    	$scope.armies = newValue;
    });
    */
    
    	/*
    $scope.armies = function() {
    	return _.map($scope.scenario.battle.armies, function(army) {
        	var a = angular.copy(army);
            a.orders = _.filter($scope.scenario.orders, function(o) {return o.country == a.country && o.army == a.army;});
            return a;
        });
        return [
        	{
            	country: 'USA',
                name: 'Foo',
                orders: []
            },
        	{
            	country: 'CSA',
                name: 'Bar',
                orders: []
            }
        ];
    }
        */
    
    $scope.toggleArmy = function(army) {
    	if ($scope.isArmyShown(army)) {
        	$scope.shownArmy = null;
		} else {
			$scope.shownArmy = army;
		}
	}
    $scope.isArmyShown = function(army) {
    	return $scope.shownArmy === army;
	}
    
    
});

