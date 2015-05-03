angular.module('cwb.controllers')

.controller('ScenarioOrdersCtrl', function($rootScope, $scope, $log, $ionicModal, $ionicPopup, Orders, Roster, Dice) {
	$log.info('load scenario orders controller');

    $scope.show = {};
    $scope.toggleItem = function(item) {
        $scope.show[item] = !$scope.show[item];
    }
    $scope.isItemShown = function(item) {
        return !!$scope.show[item];
    }

    $scope.add = function(army) {
    	var neworder = {
			"id" : $scope.orders.length,
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
    	$scope.orderid = undefined;
        openOrderDetail(army, neworder);
	}
    $scope.edit = function(order) {
    	$scope.orderid = order.id;
    	var editorder = angular.copy(order);
        editorder.type = Orders.getType(order.type);
        editorder.method = Orders.getMethod(order.method);
        editorder.status = Orders.getStatus(order.status);
        editorder.dateTime = new Date(editorder.dateTime);
        $log.info('Edit order for ' + order.country + '/' + order.army);
        openOrderDetail($scope.shownArmy, editorder);
	}
    $scope.delete = function(order) {
    	// remove the order (prompt??)
        var orders = $scope.shownArmy.orders;
        $log.info('Delete order for ' + order.country + '/' + order.army);
        $scope.showConfirm('Order Delete', 'Are you sure you want to remove this Order?')
        .then(function(ok) {
        	if (ok) {
	        	var idx = _.findIndex(orders, function(o) {
	            	return o.id == order.id;
	            });
	            if (idx > -1) {
	        		$log.debug('removing order at ' + idx + ' for ' + order.country + '/' + order.army);
	            	orders.splice(idx, 1);
	                $scope.save();
	            }
            }
        })
        .catch(function(err) {
        	$log.error('failed to remove order for ' + order.country + '/' + order.army);
        	$log.error(err);
        });
	}
    $scope.initiative = function(army) {
    	// present the initiative modal
        $log.info('Obtain initiative for ' + army.country + '/' + army.army);
        $scope.init = {
        	die1: 0,
            die2: 0,
        	status: '',
            leader: 1,
            anti: 0
		};
        
        function initiative() {
            var dice = new Dice.Dice(2, 1, 6);
            dice.roll();
            $scope.init.die1 = dice.getDie(1);
            $scope.init.die2 = dice.getDie(2);
            $scope.init.status = Orders.initiative($scope.init.die1 + $scope.init.die2, $scope.init.leader, $scope.init.anti);
        }
        $ionicPopup.show({
        	templateUrl: 'templates/order-initiative.html',
            title: 'Initiative',
            scope: $scope,
            buttons: [
            	{ text: 'Close' },
                {
                	text: '<b>Roll</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                    	e.preventDefault();
                        initiative();
					}
				}
			]
		}).then(function(ok) {
        	//if (ok) {
                delete $scope['init'];
            //}
		});
        
	}
    $scope.accept = function(order) {
    	// present the acceptance modal
        $log.info('Accept order for ' + order.country + '/' + order.army);
        $scope.accept = {
        	die1: 0,
            die2: 0,
        	status: Orders.getStatus(order.status),
            sender: 1,
            receiver: 1,
            current: false
		};
        
        function accept() {
            var dice = new Dice.Dice(2, 1, 6);
            dice.roll();
            $scope.accept.die1 = dice.getDie(1);
            $scope.accept.die2 = dice.getDie(2);
            $scope.accept.status = Orders.accept($scope.accept.die1 + $scope.accept.die2, $scope.accept.sender, $scope.accept.receiver, $scope.accept.current, order.method, order.type);
        }
        $ionicPopup.show({
        	templateUrl: 'templates/order-acceptance.html',
            title: 'Acceptance',
            scope: $scope,
            buttons: [
            	{ text: 'Close' },
                {
                	text: '<b>Roll</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                    	e.preventDefault();
                        accept();
					}
				}
			]
		}).then(function(ok) {
        	//if (ok) {
            	// update the new status
                $log.info('Setting status for Order to ' + $scope.accept.status.type);
                order.status = $scope.accept.status.type;
                delete $scope['accept'];
                $scope.save();
            //}
		});
	}
    
    $scope.reduce = function(order) {
    	// present the reduction modal
        $log.info('Reduce Order Delay for ' + order.country + '/' + order.army);
        $scope.reduceOrigStatus = $scope.reduceStatus = Orders.getStatus(order.status);
        $scope.reduceDie = 0;
        function reduce() {
            var dice = new Dice.Dice(1, 1, 6);
            dice.roll();
            $scope.reduceDie = dice.getDie(1);
            $scope.reduceStatus = Orders.delayReduction($scope.reduceDie, $scope.reduceOrigStatus.type);
        }
        reduce();
        $ionicPopup.show({
        	templateUrl: 'templates/order-delay-reduction.html',
            title: 'Delay Reduction',
            scope: $scope,
            buttons: [
            	{ text: 'Close' },
                {
                	text: '<b>Roll</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                    	e.preventDefault();
                        reduce();
					}
				}
			]
		}).then(function(ok) {
        	//if (ok) {
            	// update the new status
                $log.info('Setting status for Order to ' + $scope.reduceStatus.type);
                $scope.reduceOrigStatus = undefined;
                $scope.reduceStatus = undefined;
                $scope.reduceDie = undefined;
                
                order.status = $scope.reduceStatus.type;
                $scope.save();
            //}
		});
	}
    
    $scope.stop = function(order) {
    	// present the stoppage modal
        $log.info('Stop order for ' + order.country + '/' + order.army);
        $scope.stop = {
        	die1: 0,
            die2: 0,
        	status: Orders.getStatus(order.status),
            total: 1,
            wrecked: 0,
            leader: 0,
            leaderLost: false,
            action: 'attack'
		};
        
        function stop() {
            var dice = new Dice.Dice(2, 1, 6);
            dice.roll();
            $scope.stop.die1 = dice.getDie(1);
            $scope.stop.die2 = dice.getDie(2);
            $scope.stop.status = Orders.stop($scope.stop.die1 + $scope.stop.die2, $scope.stop.total, $scope.stop.wrecked, $scope.stop.leader, $scope.stop.leaderLost, $scope.stop.action == 'defend');
        }
        $ionicPopup.show({
        	templateUrl: 'templates/order-stoppage.html',
            title: 'Stoppage',
            scope: $scope,
            buttons: [
            	{ text: 'Close' },
                {
                	text: '<b>Roll</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                    	e.preventDefault();
                        stop();
					}
				}
			]
		}).then(function(ok) {
        	//if (ok) {
            	// update the new status
                $log.info('Setting status for Order to ' + $scope.stop.status.type);
                order.status = $scope.stop.status.type;
                delete $scope['stop'];
                $scope.save();
            //}
		});
	}
    
    // order detail
    $ionicModal.fromTemplateUrl('templates/order-detail.html', {
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
    
    $scope.ok = function() {
    	// retrieve values(?), add/update the current orders collection
        $log.info('Accepted order detail');
        var order = angular.copy($scope.order);
        order.type = $scope.order.type.type;
        order.method = $scope.order.method.method;
        order.status = $scope.order.status.type;
        order.dateTime = order.dateTime.toISOString();
        if ($scope.orderid) {
        	var idx = _.findIndex($scope.orders, function(o) {
            	return o.id == $scope.orderid;
            });
            if (idx > -1) {
            	$log.debug('updating order at ' + idx);
            	$scope.orders.splice(idx, 1, order);
            }
            else {
            	$log.debug('appending updated order');
            	$scope.orders.push(order);
			}               
        }
        else {
        	$log.debug('appending new order');
        	$scope.orders.push(order);
        }
        $scope.save();
        
    	closeOrderDetail();
    }
    
    $scope.cancel = function() {
        $log.info('Cancelled order detail');
    	closeOrderDetail();
    }
    
    $scope.$on('$destroy', function() {
    	$scope.detailModal.remove();
	});    
    
    function openOrderDetail(army, order) {
        $scope.superiorLeaders = Roster.getSuperiorLeaders($scope.scenario, {country: army.country, name: army.army});
        $scope.subordinateLeaders = Roster.getSubordinateLeaders($scope.scenario, {country: army.country, name: army.army});
        order.sender = $scope.superiorLeaders[0];
        $scope.order = order;
        $scope.orders = army.orders;
        
    	$scope.detailModal.show();
	}
    function closeOrderDetail() {
        $scope.superiorLeaders = undefined;
        $scope.subordinateLeaders = undefined;
        $scope.orderid = undefined;
        $scope.order = undefined;
        $scope.orders = undefined;
        
    	$scope.detailModal.hide();
	}
});

