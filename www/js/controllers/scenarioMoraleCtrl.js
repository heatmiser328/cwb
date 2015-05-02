angular.module('cwb.controllers')

.controller('ScenarioMoraleCtrl', function($rootScope, $scope, $log, Morale, Dice) {
	$log.info('load scenario morale controller');
    var dice = new Dice.Dice(2, 1, 6);

    $scope.morale = {};
    $scope.morale.results = '';
	
    $scope.morale.moraleDie1 = 1;
	$scope.morale.moraleDie2 = 1;
    
    $scope.moralelevels = Morale.levels;
    $scope.moralestates = Morale.states;
    
    $scope.morale.level = Morale.defaultLevel;
    $scope.morale.state = Morale.defaultState;
    $scope.morale.leader = 1;
    $scope.morale.mod = 0;
    
    
    $scope.onDie = function(die) {
    	var d = dice.getDieEx(die);
        d.increment(true);
        setDice();
        resolveMorale();
    }
    
    $scope.onChange = function() {
        resolveMorale();
    }
    
    $scope.onRoll = function() {
    	dice.roll();
        setDice();
        resolveMorale();
    }
    
    function setDice() {
	    $scope.morale.moraleDie1 = dice.getDie(1);
		$scope.morale.moraleDie2 = dice.getDie(2);
    }
    
    function resolveMorale() {
    	$log.info('Resolve morale');
        
        $scope.morale.results = Morale.check(
	    		($scope.morale.moraleDie1 * 10) + $scope.morale.moraleDie2,
                $scope.morale.level,
                $scope.morale.leader,
                $scope.morale.ldrloss,
                $scope.morale.state.code,
                $scope.morale.arty,
                $scope.morale.wrkbde,
                $scope.morale.wrkdiv,
                $scope.morale.trench,
                $scope.morale.night,
                $scope.morale.column,
                $scope.morale.lowammo,
                $scope.morale.ccdefender,
                $scope.morale.ccattacker,
                $scope.morale.ccattackersp,
                $scope.morale.mod);
    }
});

