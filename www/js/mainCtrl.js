angular.module('cwb.controllers')

.controller('MainCtrl', function($rootScope, $scope, $log, Battles) {
    $log.info('Load App Controller');

	$scope.save = function() {
    	$rootScope.$emit('save');
    }
    
	$scope.reset = function() {
    }

    Battles.load()
    .then(function(data) {
        $scope.battles = data;
    })
    .catch(function(err) {
    });

    // retrieve current game; go to scenario state, etc
});
