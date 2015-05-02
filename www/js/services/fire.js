angular.module('cwb.services')

.factory('Fire', function($log, Morale, Stragglers) {

	var cLevelAAA = 'AAA';
	var cLevelAAB = 'AAB';
	var cLevelAA = 'AA';
	var cLevelAB = 'AB';
	var cLevelA = 'A';
	var cLevelB = 'B';
	var cLevelC = 'C';

	var fireLevels = [
    	{
        	code: cLevelAAA,
            points: 26
		},
    	{
        	code: cLevelAAB,
            points: 21
		},
    	{
        	code: cLevelAA,
            points: 16
		},
    	{
        	code: cLevelAB,
            points: 11
		},
    	{
        	code: cLevelA,
            points: 6
		},
    	{
        	code: cLevelB,
            points: 3
		},
    	{
        	code: cLevelC,
            points: 0
		}
    ];

	var firePoints = [
    	{
			code: '< 1',
            points: 0.5
		},            
    	{
			code: '1',
            points: 1
		},            
    	{
			code: '2',
            points: 2
		},            
    	{
			code: '3-4',
            points: 3
		},            
    	{
			code: '5-6',
            points: 5
		},            
    	{
			code: '7-8',
            points: 7
		},
    	{
			code: '9-11',
            points: 9
		},
    	{
			code: '12-14',
            points: 12
		},
    	{
			code: '15-17',
            points: 15
		},
    	{
			code: '18-20',
            points: 18
		},
    	{
			code: '21+',
            points: 21
		}
    ];

    var results = [
    	{
        	low: -999,
            high: 0,
            results: ['0', '0', '0', '0', '0', '0', 'm-2', 'm-1', 'm', '.5', '.5', '.5']
		},
    	{
        	low: 1,
            high: 1,
            results: ['0', '0', '0', '0', 'm-2', 'm-1', 'm', '.5', '1', '1', '1']
		},
    	{
        	low: 2,
            high: 2,
            results: ['0', 'm-2', 'm-2', 'm-1', 'm', '.5', '1', '1', '1', '1', '1.5']
		},
    	{
        	low: 3,
            high: 4,
            results: ['m-1', 'm', '.5', '.5', '.5', '1', '1', '1', '1.5', '1.5', '2']
		},
    	{
        	low: 5,
            high: 6,
            results: ['.5', '.5', '.5', '1', '1', '1', '1.5', '1.5', '1.5', '2', '2']
		},
    	{
        	low: 7,
            high: 8,
            results: ['.5', '1', '1', '1', '1', '1.5', '1.5', '1.5', '2', '2', '2.5']
		},
    	{
        	low: 9,
            high: 11,
            results: ['1', '1', '1', '1', '1.5', '1.5', '1.5', '2', '2', '2.5', '2.5']
		},
    	{
        	low: 12,
            high: 14,
            results: ['1', '1', '1', '1.5', '1.5', '1.5', '2', '2', '2.5', '2.5', '3']
		},
    	{
        	low: 15,
            high: 17,
            results: ['1', '1', '1.5', '1.5', '1.5', '2', '2', '2.5', '2.5', '3', '3.5']
		},
    	{
        	low: 18,
            high: 20,
            results: ['1', '1.5', '1.5', '1.5', '2', '2', '2.5', '2.5', '3', '3.5', '3.5']
		},
    	{
        	low: 21,
            high: 999,
            results: ['1.5', '1.5', '1.5', '2', '2', '2.5', '2.5', '3', '3.5', '3.5', '4']
		}
    ];
		
	function findResult(firepoints, attackupslope, attacknight, attacklowammo, attackdg, attackccflank, attackswamp, 
    						defendtrench, defendcolumn, defendmounted, defendmoralestate) {
		if (attackdg) {
			firepoints /= 2;
		}
		
        var index = _.findIndex(results, function(r) {
        	return firepoints >= r.low && firepoints <= r.high;
        });
		if (index == -1) {return null;}
		
		// shifts
		if (attackupslope) {
			index--;
		}
		if (attacknight) {
			index -= 2;
		}
		if (attacklowammo) {
			index--;
		}
		if (attackccflank) {
			index -= 3;
		}
		if (attackswamp) {
			index--;
		}
		if (defendtrench) {
			index--;
		}
		if (defendcolumn || 
			Morale.isDisorganized(defendmoralestate.code) || Morale.isRouted(defendmoralestate.code)) {
			index += 2;
		}
		if (defendmounted) {
			index += 3;
		}
		
		if (index < 0) {
        	index = 0;
		}
		else if (index >= results.length) {
        	index = results.length - 1;
		}
	
		return results[index];
	}								
        
	function isMoraleResult(result) {
    	return result && result.length > 0 && result.charAt(0) == 'm';
    }
        
	function moraleMod(result) {
    	return result && result.length > 2 ? parseInt(result.charAt(2)) : 0;
    }       
        
	var FireCombat = {
    	points: firePoints,
    	defaultPoints: firePoints[3],
    
    	fire: function(firedice, lossdie, stragglerdie, moraledice, leaderlossdice, 
        			firepoints, attackupslope, attacklowammo, attackdg, attackccflank, attackswamp, attacknight, 
                    defendmoralelevel, defendleaderrating, defendmoralestate, defendlowammo, defendtrench, defendmounted, 
                    defendcolumn, defendunlimbarty, defendwreckedbde, defendwreckeddiv, defendccdefend, defendccattack, 
                    defendccattackspecial) {
                    
			var casualty = 0;
			var straggler = 0;
			var morale = Morale.states[1].desc;//Morale.defaultState;
            var leaderloss = false;
			var lowammo = (firedice >= 11);
			
            /*
            firepoints = _.find(firePoints, function(fp) {
            	return fp.code == firepoints;
            }) || 0;
            */
            
            var fr = findResult(firepoints.points, attackupslope, attacknight, attacklowammo, attackdg, attackccflank, attackswamp, 
            						defendtrench, defendcolumn, defendmounted, defendmoralestate);
			if (fr != null) {
				var moralecheck = false;
                var moralemod = 0;
				
				firedice -= 2;	// index-ize
				
				var result = fr.results[firedice];
                if (isMoraleResult(result)) {
					moralecheck = true;
					moralemod = moraleMod(result);
				}
				else {
					var losses = parseFloat(result);
					if (losses > 0 && lossdie > 3) {
						losses += 0.5;
					}                        
					if (losses > 0) {
						straggler = Stragglers.losses(stragglerdie, losses, 
                        							defendmoralelevel, defendmoralestate.code, defendcolumn, defendmounted,
                                                    attacknight, defendwreckedbde || defendwreckeddiv);
						moralecheck = true;
						// check for leader casualty...
						casualty = Math.floor(losses);
						if (casualty > 0) {
							leaderloss = (leaderlossdice <= 2 || leaderlossdice >= 11);
						}                            
					}
				}
				if (moralecheck) {
					morale = Morale.check(moraledice, 
								defendmoralelevel, defendleaderrating, leaderloss, defendmoralestate.code, 
								defendunlimbarty, defendwreckedbde, defendwreckeddiv, 
								defendtrench, attacknight, defendcolumn, defendlowammo,
								defendccdefend, defendccattack, defendccattackspecial, moralemod);
				}
			}
            
            return {
				casualty: casualty, 
				straggler: straggler, 
				morale: morale, 
	            leaderloss: leaderloss, 
				lowammo: lowammo
            };
		}
	};	
	
	return FireCombat;
});
