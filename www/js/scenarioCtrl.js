angular.module('cwb.controllers')

.controller('ScenarioCtrl', function($rootScope, $scope, $log, $stateParams, Battles, Current) {
	$log.info('load scenario controller');
    
    $rootScope.$on('load', function(e, id) {
    	load(id);
    });
    
    $rootScope.$on('save', function() {
    	$log.info('Save scenario');
        Current.save($scope.current);
    });
    
    function load(id) {
	    Battles.getScenario(id)
		.then(function(data) {
			$log.info('retrieved scenario');
	        $scope.scenario = data;
	        // current scenario settings: turn, orders, roster, etc.
	        var current = Current.load();
	        if (current.scenario != data.id) {
	        	current = null;
	        }
	        $scope.current = current || Current.new(data)
		})
		.catch(function(err) {
			$log.error('failed to retrieve scenario');
			$log.error(err);
	        $scope.scenario = {};
	        $scope.current = {};
		});
	}        
    
    load($stateParams.scenarioId);
});
