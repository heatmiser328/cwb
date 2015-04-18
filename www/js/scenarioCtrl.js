angular.module('cwb.controllers')

.controller('ScenarioCtrl', function($rootScope, $scope, $log, $stateParams, Battles, Current) {
	$log.info('load scenario controller');
    
    $rootScope.$on('save', function() {
    	$log.info('Save scenario');
        Current.save($scope.current);
    });
    
    Battles.getScenario($stateParams.scenarioId)
	.then(function(data) {
		$log.info('retrieved scenario');
        $scope.scenario = data;
        // current scenario settings: turn, orders, roster, etc.
        $scope.current = Current.load() || Current.new(data)
	})
	.catch(function(err) {
		$log.error('failed to retrieve scenario');
		$log.error(err);
        $scope.scenario = {};
        $scope.current = {};
	});
});
