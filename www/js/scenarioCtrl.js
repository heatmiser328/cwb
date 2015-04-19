angular.module('cwb.controllers')

.controller('ScenarioCtrl', function($rootScope, $scope, $log, $stateParams, Battles, Current) {
	$log.info('load scenario controller');
    
    $rootScope.$on('load', function(e, id) {
    	load(id);
    });
    
    $rootScope.$on('reset', function() {
    	$log.info('reset scenario');
        $scope.current = Current.new($scope.scenario);
    	save();
    });
    
    $rootScope.$on('save', function() {
    	save();
    });
    
    function load(id) {
	    Battles.getScenario(id)
		.then(function(data) {
			$log.info('retrieved scenario');
	        $scope.scenario = data;
	        // current scenario settings: turn, orders, roster, etc.
	        var current = Current.load();
	        if (current && current.scenario != data.id) {
	        	current = null;
	        }
	        $scope.current = current || Current.new(data);
		})
		.catch(function(err) {
			$log.error('failed to retrieve scenario');
			$log.error(err);
	        $scope.scenario = {};
	        $scope.current = {};
		})
        .finally(function() {
        	save();
        });
	}        
    
    function save() {
    	$log.info('Save scenario');
        Current.save($scope.current);
    }
    
    load($stateParams.scenarioId);
});
