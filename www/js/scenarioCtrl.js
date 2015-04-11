angular.module('cwb.controllers')

.controller('ScenarioCtrl', function($scope, $log, $stateParams, $state, Battles) {
	$log.info('load scenario controller');
    Battles.getScenario($stateParams.scenarioId)
	.then(function(data) {
		$log.info('retrieved scenario');
        $scope.scenario = data;
        // current scenario settings: turn, orders, roster, etc.
        $scope.current = {};
	})
	.catch(function(err) {
		$log.error('failed to retrieve scenario');
		$log.error(err);
        $scope.scenario = {};
        $scope.current = {};
	})
    .finally(function() {
        //$state.go('app.scenario.turn');
    });
    
});
