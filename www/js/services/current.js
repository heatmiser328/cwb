angular.module('cwb.services')

.factory('Current', function($localstorage, Phases) {
	var key = 'cwb-current';
    
	return {
    	new: function(scenario) {
        	return {
            	scenario: scenario.id,
                dateTime: new Date(scenario.startDateTime),
                phase: Phases.get(0),
                player: scenario.firstPlayer,
                confederateAmmo: scenario.confederateAmmo,
                confederateCasualty: scenario.confederateCasualty,
                confederateVP: 0,
                unionAmmo: scenario.unionAmmo,
                unionCasualty: scenario.unionCasualty,
                unionVP: 0,
                orders: angular.copy(scenario.defaultOrders)
            };
        },
    	load: function() {
        	return $localstorage.getObject(key);
        },
        save: function(current) {
        	$localstorage.setObject(key, current);
        }
    };
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      var v = $window.localStorage[key];
      return v && v != "undefined" ? JSON.parse(v) : undefined;
    }
  }
}]);