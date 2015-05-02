angular.module('cwb.controllers')

.controller('ScenarioFireCtrl', function($rootScope, $scope, $log, Fire, Morale, Dice) {
	$log.info('load scenario fire controller');
    var dice = new Dice.Dice(8, 1, 6);

    $scope.show = {};
    $scope.show.results = true;
    $scope.show.attacker = true;
    $scope.show.defender = true;
    $scope.attack = {};
    $scope.defend = {};
    $scope.results = {};
	
    $scope.fireDie1 = 1;
	$scope.fireDie2 = 1;
	$scope.roundDie = 1;
	$scope.stragglerDie = 1;
	$scope.moraleDie1 = 1;
	$scope.moraleDie2 = 1;
	$scope.ldrlossDie1 = 1;
	$scope.ldrlossDie2 = 1;
    
    $scope.firepts = Fire.points;
    $scope.moralelevels = Morale.levels;
    $scope.moralestates = Morale.states;
    
    $scope.attack.points = Fire.defaultPoints;
    $scope.defend.level = Morale.defaultLevel;
    $scope.defend.state = Morale.defaultState;
    $scope.defend.leader = 1;
    
    $scope.toggleItem = function(item) {
    	$scope.show[item] = !$scope.show[item];
    }
    
    $scope.isItemShown = function(item) {
    	return !!$scope.show[item];
    }
    
    $scope.adjustUsaAmmo = function(d) {
    	$scope.current.unionAmmo += d;
        if ($scope.current.unionAmmo < 0) {
        	$scope.current.unionAmmo = 0;
        }
        $scope.save();
    }
    
    $scope.adjustCsaAmmo = function(d) {
    	$scope.current.confederateAmmo += d;
        if ($scope.current.confederateAmmo < 0) {
        	$scope.current.confederateAmmo = 0;
        }
        $scope.save();
    }
    
    $scope.onDie = function(die) {
    	var d = dice.getDieEx(die);
        d.increment(true);
        setDice();
        resolveFire();
    }
    
    $scope.onChange = function() {
        resolveFire();
    }
    
    $scope.onRoll = function() {
    	dice.roll();
        setDice();
        resolveFire();
    }
    
    function setDice() {
	    $scope.fireDie1 = dice.getDie(1);
		$scope.fireDie2 = dice.getDie(2);
		$scope.roundDie = dice.getDie(3);
		$scope.stragglerDie = dice.getDie(4);
		$scope.moraleDie1 = dice.getDie(5);
		$scope.moraleDie2 = dice.getDie(6);
		$scope.ldrlossDie1 = dice.getDie(7);
		$scope.ldrlossDie2 = dice.getDie(8);
    }
    
    function resolveFire() {
    	$log.info('Resolve fire');
        
        var diceFire = $scope.fireDie1 + $scope.fireDie2;
        var diceRound = $scope.roundDie;
        var diceStraggler = $scope.stragglerDie;
        var diceMorale = ($scope.moraleDie1*10) + $scope.moraleDie2;
        var diceLeaderLoss = $scope.ldrlossDie1 + $scope.ldrlossDie2;
        
        var result = Fire.fire(diceFire, diceRound, diceStraggler, diceMorale, diceLeaderLoss,
        						$scope.attack.points,$scope.attack.upslope,$scope.attack.lowammo,$scope.attack.dg,$scope.attack.ccflank,$scope.attack.swamp,$scope.attack.night,
                      			$scope.defend.level,$scope.defend.leader,$scope.defend.state,$scope.defend.lowammo,$scope.defend.trench,$scope.defend.mounted,$scope.defend.column,
                                $scope.defend.arty,$scope.defend.wrkbgd,$scope.defend.wrkdiv,$scope.defend.ccdefender,$scope.defend.ccattacker,$scope.defend.ccattackersp);
                
		$scope.results.casualty = result.casualty;
        $scope.results.stragglers = result.straggler;
        $scope.results.morale = result.morale;
        $scope.results.lowammo = result.lowammo;
        $scope.results.leaderloss = result.leaderloss;
    }
});

