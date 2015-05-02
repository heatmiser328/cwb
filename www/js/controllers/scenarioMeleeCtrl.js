angular.module('cwb.controllers')

.controller('ScenarioMeleeCtrl', function($rootScope, $scope, $log, Melee, Dice) {
	$log.info('load scenario melee controller');
    var dice = new Dice.Dice(2, 1, 6);
    var odds = 1;

    $scope.show = {};
    $scope.show.results = true;
    $scope.show.attacker = true;
    $scope.show.defender = true;
    $scope.attack = {};
    $scope.defend = {};
    $scope.results = '';
	
    $scope.attack.level = Melee.defaultLevel;
    $scope.defend.aa = true;
    
    $scope.meleeDie = 1;
	$scope.tieBreakerDie = 1;
    
    $scope.toggleItem = function(item) {
    	$scope.show[item] = !$scope.show[item];
    }
    $scope.isItemShown = function(item) {
    	return !!$scope.show[item];
    }
    
    $scope.onDie = function(die) {
    	var d = dice.getDieEx(die);
        d.increment(true);
        setDice();
        resolveMelee();
    }
    
    $scope.onChange = function() {
    	calcOdds();
        resolveMelee();
    }
    
    $scope.onRoll = function() {
    	dice.roll();
        setDice();
        resolveMelee();
    }
    
    function setDice() {
	    $scope.meleeDie = dice.getDie(1);
		$scope.tieBreakerDie = dice.getDie(2);
    }
    
    function defenderLevels() {
    	var levels = [];
        if ($scope.defend.aa) {
            levels.push(Melee.levelAA);
        }
        if ($scope.defend.ab) {
            levels.push(Melee.levelAB);
        }
        if ($scope.defend.a) {
            levels.push(Melee.levelA);
        }
        if ($scope.defend.b) {
            levels.push(Melee.levelB);
        }
        if ($scope.defend.c) {
            levels.push(Melee.levelC);
        }
        if ($scope.defend.arty) {
            levels.push(Melee.levelArty);
        }
    	return levels;
    }
    
    function calcOdds() {
    	odds = Melee.calcOdds([$scope.attack.level], defenderLevels(), $scope.defend.trench);
        $scope.odds = odds ? odds.text : '';
    }
    
    function resolveMelee() {
    	$log.info('Resolve melee');
        $scope.results = Melee.assault($scope.meleeDie, $scope.tieBreakerDie, odds ? odds.odds : 1, $scope.attack.wrkbde, $scope.defend.wrkbde, $scope.defend.wrkdiv);
    }
    
    calcOdds();
});

