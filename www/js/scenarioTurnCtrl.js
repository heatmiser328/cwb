angular.module('cwb.controllers')

.controller('ScenarioTurnCtrl', function($scope, $log, Phases) {
	$log.info('load scenario turn controller');
    $scope.turnPrev = function() {
    	$log.debug('previous turn');
    	changeTurn(-1);
    }
    $scope.turnNext = function() {
    	$log.debug('next turn');
    	changeTurn(1);
    }
    $scope.phasePrev = function() {
    	$log.debug('previous phase');
    	changePhase(-1);
    }
    $scope.phaseNext = function() {
    	$log.debug('next phase');
    	changePhase(1);
    }
    
    function changeTurn(c) {
    	if (c != 0) {
        	var st = new Date($scope.scenario.startDateTime);
        	var et = new Date($scope.scenario.endDateTime);
        	var dt = $scope.current.dateTime;
            var incr = getTimeIncrement(dt) * (c < 0 ? -1 : 1);
            
        	dt.setMinutes(dt.getMinutes() + incr);
            if (dt < st) {
            	dt = st;
            }
            else if (dt > et) {
            	dt = et;
			}                    
            $scope.current.dateTime = dt;
        }
    }
    
    function changePhase(c) {
    	var currentphase = Phases.getIndex($scope.current.phase);
        currentphase += c;
        if (currentphase < 0) {
        	$scope.turnPrev();
        	currentphase = Phases.count() - 1;
        }
        else if (currentphase >= Phases.count()) {
        	$scope.turnNext();
        	currentphase = 0;
        }
        $scope.current.phase = Phases.get(currentphase);
    }
   
	function getTimeIncrement(dt) {
    	return isNight(dt) ? $scope.scenario.battle.nightTimeIncr : $scope.scenario.battle.dayTimeIncr;
	}
    
    function isNight(dt) {
        var now = moment(dt);
        
        var dawn = moment(now.format('YYYY-MM-DD') + 'T' + $scope.scenario.battle.dawnTime);
        var dusk = moment(now.format('YYYY-MM-DD') + 'T' + $scope.scenario.battle.duskTime);
		
        return ((now.isSame(dusk) || now.isAfter(dusk)) && now.isBefore(dawn));
    }
});
