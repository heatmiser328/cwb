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
                        s.armies = _.map(battle.armies, function(army) {
                            return {
                                country: army.country,
                                name: army.name,
                                commander: army.commander,
                                roster: angular.copy(army.roster)
                            };
                        });

                        s.battle = {
                        	title: battle.title,
                            dayTimeIncr: battle.dayTimeIncr,
                            nightTimeIncr: battle.nightTimeIncr,
                            dawnTime: battle.dawnTime,
                            duskTime: battle.duskTime
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
});

