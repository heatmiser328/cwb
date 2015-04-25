angular.module('cwb.controllers')

.controller('ScenarioRosterCtrl', function($rootScope, $scope, $log, $ionicModal, $ionicPopup, Roster, Dice) {
	$log.info('load scenario roster controller');
    
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
    
    $scope.toggleCorps = function(corps) {
    	if ($scope.isCorpsShown(corps)) {
        	$scope.shownCorps = null;
		} else {
			$scope.shownCorps = corps;
		}
	}
    $scope.isCorpsShown = function(corps) {
    	return $scope.shownCorps === corps;
	}
    
    $scope.toggleDivision = function(division) {
    	if ($scope.isDivisionShown(division)) {
        	$scope.shownDivision = null;
		} else {
			$scope.shownDivision = division;
		}
	}
    $scope.isDivisionShown = function(division) {
    	return $scope.shownDivision === division;
	}
    
    $scope.toggleIndependents = function(brigade) {
    	if ($scope.isIndependentsShown(brigade)) {
        	$scope.shownIndependents = null;
		} else {
			$scope.shownIndependents = brigade;
		}
	}
    $scope.isIndependentsShown = function(brigade) {
    	return $scope.shownIndependents === brigade;
	}
    
    $scope.range = function(a) {
    	a = a || [];
        var input = [];
        if (_.isArray(a)) {
        	for (var i = 0; i <= a.length; i++) {input.push(i);}
		} else {
        	input = _.range(a);
        }            
        return input;        
    }
    
    $scope.brigadeFireLevels = function(brigade) {
    	return Roster.getFireLevels(brigade.totalStrength);
    }
    
    $scope.brigadeFireLevel = function(brigade) {
    	var fl = Roster.getFireLevel(brigade.totalStrength - brigade.losses - brigade.stragglers) || {level: ''};
        return fl.level;
    }
    
    $scope.brigadeRange = function(brigade) {
        return _.range(brigade.totalStrength + 1);
    }
    
	/*
	ion-android-done					= wrecked divider
	ion-android-checkbox-outline-blank	= open box
	ion-android-checkbox-outline 		= straggler
	ion-android-checkbox				= casualty
	*/
    $scope.divisionItemClass = function(division, i) {
        if (i == division.wreckLosses) {
        	return 'ion-android-done';
        }
    
    	var wrecked = (_.filter(division.brigades, Roster.isWrecked) || []).length;
        if (wrecked > 0 && i<wrecked) {
        	return 'ion-android-checkbox';
        }
        return 'ion-android-checkbox-outline-blank';
    }
    
    $scope.isDivisionWrecked = function(division) {
    	var wrecked = _.filter(division.brigades, Roster.isWrecked) || [];
        return wrecked.length >= division.wreckLosses;
    }
    
    $scope.isBrigadeWrecked = function(brigade) {
        return Roster.isWrecked(brigade);
    }
    $scope.isBrigadeDestroyed = function(brigade) {
        return Roster.isDestroyed(brigade);
    }
    
    $scope.adjustLosses = function(brigade, v) {
    	brigade.losses += v;
        if (brigade.losses < 0) {
	        brigade.losses = 0;
        } 
        else if (brigade.losses > (brigade.totalStrength - brigade.stragglers)) {
	        brigade.losses = brigade.totalStrength - brigade.stragglers;
        }
        $scope.save();
    }
    $scope.adjustStragglers = function(brigade, v) {
    	brigade.stragglers += v;
        if (brigade.stragglers < 0) {
	        brigade.stragglers = 0;
        } 
        else if (brigade.stragglers > (brigade.totalStrength - brigade.losses)) {
	        brigade.stragglers = brigade.totalStrength - brigade.losses;
        }
        $scope.save();
    }
    
});

