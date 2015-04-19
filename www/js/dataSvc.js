angular.module('cwb.services')

.factory('Battles', function ($http, $q) {
	var battles = [];
    var url = '';
    if(ionic.Platform.isAndroid()){
    	url = 'file:///android_asset/www';
	}
    
    function load() {
    	var deferred = $q.defer();
        if (battles.length > 0) {
        	deferred.resolve(battles);
        }
        else {
	    	$http.get(url + '/data/battles.json')
	    	.success(function(data, status, headers, config) {
            	battles = data;
	        	deferred.resolve(battles);
	        })
	        .error(function(data, status, headers, config) {
	        	deferred.reject(data);
	        });        
		}            
        return deferred.promise;
    }
    
    function save() {
    }
    
    function get(battleId) {
    	var deferred = $q.defer();
        load()
        .then(function(data) {
	    	for (var i=0; i<data.length; i++) {
	    		var battle = data[i];
	        	if (battle.id == battleId) {
	            	return deferred.resolve(battle);
	            }
	        }
            deferred.resolve({});
        })
        .catch(function(err) {
        	deferred.reject(err);
        });
        return deferred.promise;
    }
    
    function getScenario(scenarioId) {
    	var deferred = $q.defer();
        load()
        .then(function(data) {
	    	for (var i=0; i<data.length; i++) {
	    		var battle = data[i];
                for (var j=0; j<battle.scenarios.length; j++) {
                	var scenario = battle.scenarios[j];
		        	if (scenario.id == scenarioId) {
                        var s = angular.copy(scenario);
                        s.battle = {
                        	title: battle.title,
                            dayTimeIncr: battle.dayTimeIncr,
                            nightTimeIncr: battle.nightTimeIncr,
                            dawnTime: battle.dawnTime,
                            duskTime: battle.duskTime,
                            armies: _.map(battle.armies, function(army) {
                            	return {
                                	country: army.country,
                                	name: army.name,
                                	commander: army.commander
                                };
                            })
						};                            
		            	return deferred.resolve(s);
		            }
                }
	        }
            deferred.resolve({});
        })
        .catch(function(err) {
        	deferred.reject(err);
        });
        return deferred.promise;
    }
    
    return {
    	load: load,
        save: save,
        get: get,
        getScenario: getScenario
    };
})

.factory('Phases', function() {
	var phases = [
      '1: Order Issue', 
      '1: Corps Attack Stoppage Check', 
      '1: Initiative Order Determination', 
      '1: Delay Reduction', 
      '1: New Order Acceptance', 
      '1: Straggler Recovery Marker Placement', 
      '1: Movement / Close Combat', 
      '1: Ammo Resupply', 
      '1: Defensive Fire', 
      '1: Offensive Fire', 
      '1: Straggler Recovery', 
      '1: Rally', 
      '2: Order Issue', 
      '2: Corps Attack Stoppage Check', 
      '2: Initiative Order Determination', 
      '2: Delay Reduction', 
      '2: New Order Acceptance', 
      '2: Straggler Recovery Marker Placement', 
      '2: Movement / Close Combat', 
      '2: Ammo Resupply', 
      '2: Defensive Fire', 
      '2: Offensive Fire', 
      '2: Straggler Recovery', 
      '2: Rally'
    ];
    
    return {
    	get: function(idx) {
        	if (idx != undefined) {
            	return phases[idx];
            }
            return phases;
        },
    	getIndex: function(name) {
        	for (var i=0; i<phases.length; i++) {
            	if (phases[i] == name) {
                	return i;
                }
            }
            return -1;
        },
        count: function() {
        	return phases.length;
        }
    };
})

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