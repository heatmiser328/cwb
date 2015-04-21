angular.module('cwb.services')

.factory('Roster', function() {
    function getUSASuperiorLeaders(scenario) {
    	return getSuperiorLeadersForCountry(scenario, "USA");
    }
    function getUSASubordinateLeaders(scenario) {
    	return getSubordinateLeadersForCountry(scenario, "USA");
    }
    
    function getCSASuperiorLeaders(scenario) {
    	return getSuperiorLeadersForCountry(scenario, "CSA");
    }
    function getCSASubordinateLeaders(scenario) {
    	return getSubordinateLeadersForCountry(scenario, "CSA");
    }
    
    function getUSARoster(scenario) {
    	return getRosterForCountry(scenario, "USA");
	}
	
    function getCSARoster(scenario) {
    	return getRosterForCountry(scenario, "CSA");
	}
	
    function getArmiesForCountry(scenario, country, army) {
    	return _.filter(scenario.armies, function(a) {
        	return country == a.country && (!army || army == a.name);
		});
    }
    
    function getCommanders(roster) {
    	var cmdrs = [];
        function add(item) {
        	if (!_.contains(cmdrs, item.commander)) {
            	cmdrs.push(item.commander);
            }
            _.each(item.subordinates, add);
        }
        
    	_.each([roster.corps, roster.divisions, roster.independents], function(item) {
	    	_.each(item, add);
        });
        
        return cmdrs;
    }
    
    function getSuperiorCommanders(army) {
        return [army.commander].concat(getCommanders(army.roster));
    }
    
    function getSubordinateCommanders(army) {
        return getCommanders(army.roster);
    }
    
	function getSuperiorLeadersForCountry(scenario, army) {
        return _.flatten(_.map(getArmiesForCountry(scenario, army.country, army.name), function(a) {
        		return getSuperiorCommanders(a);
			})
        );
    }
    function getSubordinateLeadersForCountry(scenario, army) {
        return _.flatten(_.map(getArmiesForCountry(scenario, army.country, army.name), function(a) {
            	return getSubordinateCommanders(a);
			})                    
        );
    }
    
	function getRosterForCountry(scenario, country) {
    	return _.map(getArmiesForCountry(scenario, country), function(army) {
        	return army.roster;
		});                
	}


    return {
    	getSuperiorLeaders: function(scenario, army) {
        	return getSuperiorLeadersForCountry(scenario, army);
        },
        getSubordinateLeaders: function(scenario, army) {
    		return getSubordinateLeadersForCountry(scenario, army);
        }
    };
});
