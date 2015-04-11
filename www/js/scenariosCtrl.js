angular.module('cwb.controllers')

.controller('ScenariosCtrl', function($scope, $log, $stateParams, Battles) {
	$log.info('load scenarios controller');
    Battles.get($stateParams.battleId)
	.then(function(data) {
		$log.info('retrieved scenarios');
        $scope.battle = data;
	})
	.catch(function(err) {
		$log.error('failed to retrieve scenarios');
		$log.error(err);
        $scope.battle = {};
	});
    
});
