angular.module('cwb.controllers')

.controller('MainCtrl', function($rootScope, $scope, $location, $log, Battles, Current) {
    $log.info('Load App Controller');

	$scope.select = function(scenario) {
    	$rootScope.$emit('load', scenario.id);
    }
    
    $scope.noCurrent = function() {
    	return !Current.load();
    }
    
    $scope.toggleBattle = function(battle) {
    	if ($scope.isBattleShown(battle)) {
        	$scope.shownBattle = null;
		} else {
			$scope.shownBattle = battle;
		}
	}
    $scope.isBattleShown = function(battle) {
    	return $scope.shownBattle === battle;
	}
    
    Battles.load()
    .then(function(data) {
        $scope.battles = data;
        var current = Current.load();
        if (current && current.scenario) {
        	//$state.go('app.scenario.turn');
            $log.debug('initial load');
            //$location.path('/app/scenario/' + current.scenario + '/turn');
            $location.path('/app/scenario/' + current.scenario + '/melee');
        }
    })
    .catch(function(err) {
    	$log.error(err);
    });

});
