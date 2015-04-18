angular.module('cwb.controllers')

.controller('MainCtrl', function($rootScope, $scope, $location, $log, Battles) {
    $log.info('Load App Controller');

	$scope.save = function() {
    	$rootScope.$emit('save');
    }
    
	$scope.reset = function() {
    }

	$scope.select = function(scenario) {
        //$location.path('/app/scenario/' + scenario.id + '/turn');
    	$rootScope.$emit('load', scenario.id);
    }
    
    $scope.toggleBattles = function() {
		$scope.shownBattles = !$scope.shownBattles;
	}
    $scope.isBattlesShown = function() {
    	return !!$scope.shownBattles;
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
    })
    .catch(function(err) {
    	$log.error(err);
    });

    // retrieve current game; go to scenario state, etc
});
