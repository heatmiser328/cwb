angular.module('cwb.directives')

.value('wreckedDivider', 'ion-android-done')
.value('openBox', 'ion-android-checkbox-outline-blank')
.value('stragglerBox', 'ion-android-checkbox-outline')
.value('casualtyBox', 'ion-android-checkbox')

.directive('roster', [function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            armies: "=ngModel"
        },
        templateUrl: 'templates/roster.html',
        controller: 'RosterDirectiveController'
    };
}])
.controller('RosterDirectiveController', ['$scope', '$log', function ($scope, $log) {
}])

.directive('army', [function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            army: "=ngModel"
        },
        templateUrl: 'templates/roster-army.html',
        controller: 'RosterArmyDirectiveController'
    };
}])
.controller('RosterArmyDirectiveController', ['$scope', '$log', function ($scope, $log) {
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
    
}])

.directive('corps', [function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            corps: "=ngModel",
            country: '=country'
        },
        templateUrl: 'templates/roster-corps.html',
        controller: 'RosterCorpsDirectiveController'
    };
}])
.controller('RosterCorpsDirectiveController', ['$scope', '$log', function ($scope, $log) {
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
}])

.directive('division', [function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            division: "=ngModel",
            country: '=country'
        },
        templateUrl: 'templates/roster-division.html',
        controller: 'RosterDivisionDirectiveController'
    };
}])
.controller('RosterDivisionDirectiveController', ['$scope', '$log', 'Roster', 'openBox', 'wreckedDivider', 'casualtyBox', function ($scope, $log, Roster, openBox, wreckedDivider, casualtyBox) {
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
        
    $scope.divisionItemClass = function(division, i) {
        if (i == division.wreckLosses) {
        	return wreckedDivider;
        }
    
    	var wrecked = (_.filter(division.brigades, Roster.isWrecked) || []).length;
        if (wrecked > 0 && i<wrecked) {
        	return casualtyBox;
        }
        return openBox;
    }
    
    $scope.isDivisionWrecked = function(division) {
    	var wrecked = _.filter(division.brigades, Roster.isWrecked) || [];
        return wrecked.length >= division.wreckLosses;
    }
}])

.directive('brigade', [function () {
    return {
        restrict: 'E',
        replace: true,
        require: 'ngModel',
        scope: {
            brigade: "=ngModel",
            country: '=country'
        },
        templateUrl: 'templates/roster-brigade.html',
        controller: 'RosterBrigadeDirectiveController'
    };
}])
.controller('RosterBrigadeDirectiveController', ['$rootScope', '$scope', '$log', 'Roster', function ($rootScope, $scope, $log, Roster) {

	function save() {
    	$rootScope.$emit('save');
    }

    $scope.isBrigadeWrecked = function(brigade) {
        return Roster.isWrecked(brigade);
    }
    $scope.isBrigadeDestroyed = function(brigade) {
        return Roster.isDestroyed(brigade);
    }
    
    $scope.brigadeFireLevel = function(brigade) {
    	var fl = Roster.getFireLevel(brigade.totalStrength - brigade.losses - brigade.stragglers) || {level: ''};
        return fl.level;
    }    
    
    $scope.adjustLosses = function(brigade, v) {
    	brigade.losses += v;
        if (brigade.losses < 0) {
	        brigade.losses = 0;
        } 
        else if (brigade.losses > (brigade.totalStrength - brigade.stragglers)) {
	        brigade.losses = brigade.totalStrength - brigade.stragglers;
        }
        save();
    }
    $scope.adjustStragglers = function(brigade, v) {
    	brigade.stragglers += v;
        if (brigade.stragglers < 0) {
	        brigade.stragglers = 0;
        } 
        else if (brigade.stragglers > (brigade.totalStrength - brigade.losses)) {
	        brigade.stragglers = brigade.totalStrength - brigade.losses;
        }
        save();
    }
}])

;

