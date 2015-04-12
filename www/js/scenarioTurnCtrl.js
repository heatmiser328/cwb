angular.module('cwb.controllers')

.controller('ScenarioTurnCtrl', function($rootScope, $scope, $log) {
	$log.info('load scenario turn controller');
    $scope.current = {
    	turn: new Date(),
        phase: "Command"
    };
});
