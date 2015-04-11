angular.module('cwb.controllers')

.controller('BattlesCtrl', function($scope, $log, Battles) {
	$log.info('load battles controller');
	Battles.load()
	.then(function(data) {
		$log.info('retrieved battles');
		$scope.battles = data;
	})
	.catch(function(err) {
		$log.error('failed to retrieve battles');
		$log.error(err);
	});
});
