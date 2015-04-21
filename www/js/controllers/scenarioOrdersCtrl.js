angular.module('cwb.controllers')

.controller('ScenarioOrdersCtrl', function($rootScope, $scope, $log, $ionicModal, Orders, Roster) {
	$log.info('load scenario orders controller');
    
    $scope.reset = function() {
    	$rootScope.$emit('reset');
    }
    
    $scope.toggleArmy = function(army) {
    	if ($scope.isArmyShown(army)) {
        	$scope.shownArmy = null;
		} else {
			$scope.shownArmy = army;
		}
	}
    $scope.isArmyShown = function(army) {
    	return $scope.shownArmy === army;
	}
    
    $scope.add = function(army) {
    	var neworder = {
			"id" : 1,
			"country" : army.country,
			"army" : army.army,
			"sender" : '',
			"receiver" : '',
			"dateTime" : new Date($scope.current.dateTime),
			"type" : $scope.types[0],
			"method" : $scope.methods[0],
			"force" : 'F1',
			"text" : '',
			"status" : $scope.statuses[0]
		};
        $log.info('Add New order for ' + army.country + '/' + army.army);
        $scope.openOrderDetail(army, neworder);
	}
    $scope.edit = function(order) {
    	var editorder = angular.copy(order);
        editorder.type = Orders.getType(order.type);
        editorder.method = Orders.getMethod(order.method);
        editorder.status = Orders.getStatus(order.status);
        editorder.dateTime = new Date(editorder.dateTime);
        $log.info('Edit order for ' + order.country + '/' + order.army);
        $scope.openOrderDetail($scope.shownArmy, editorder);
	}
    $scope.delete = function(order) {
    	// remove the order (prompt??)
        $log.info('Delete order for ' + order.country + '/' + order.army);
	}
    $scope.initiative = function(army) {
    	// present the initiative modal
        $log.info('Obtain initiative for ' + army.country + '/' + army.army);
	}
    $scope.accept = function(order) {
    	// present the acceptance modal
        $log.info('Accept order for ' + order.country + '/' + order.army);
	}
    $scope.stop = function(order) {
    	// present the stoppage modal
        $log.info('Stop order for ' + order.country + '/' + order.army);
	}
    
    // order detail
    $ionicModal.fromTemplateUrl('templates/scenario-tab-orders-order.html', {
    	scope: $scope,
        animation: 'slide-in-up'
	}).then(function(modal) {
    	$scope.detailModal = modal;
	}).catch(function(err) {
    	$log.error(err);
    });
    
    $scope.statuses = Orders.statuses;
    $scope.types = Orders.types;
    $scope.methods = Orders.methods;
    
    $scope.openOrderDetail = function(army, order) {
        $scope.superiorLeaders = Roster.getSuperiorLeaders($scope.scenario, {country: army.country, name: army.army});
        $scope.subordinateLeaders = Roster.getSubordinateLeaders($scope.scenario, {country: army.country, name: army.army});
        order.sender = $scope.superiorLeaders[0];
        $scope.order = order;
        
    	$scope.detailModal.show();
	}
    $scope.closeOrderDetail = function() {
    	$scope.detailModal.hide();
	}
    
    $scope.accept = function() {
    	// retrieve values(?), add/update the current orders collection
        $log.info('Accepted order detail');
    	$scope.closeOrderDetail();
    }
    
    $scope.cancel = function() {
        $log.debug('Cancelled order detail');
    	$scope.closeOrderDetail();
    }
    
    $scope.$on('$destroy', function() {
    	$scope.detailModal.remove();
	});    
});

