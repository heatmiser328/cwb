angular.module('cwb.services')

.factory('Morale', function($log) {

	var cStateBloodLust = 'BL';
	var cStateNormal = 'N';
	var cStateShaken = 'SH';
	var cStateDisorganized = 'DG';
	var cStateRouted = 'R';
    
    var states = [
    	{
        	code: cStateBloodLust,
            desc: 'Blood Lust'
		},                
    	{
        	code: cStateNormal,
            desc: 'Normal'
		},                
    	{
        	code: cStateShaken,
            desc: 'Shaken'
		},                
    	{
        	code: cStateDisorganized,
            desc: 'Disorganized'
		},                
    	{
        	code: cStateRouted,
            desc: 'Routed'
		}                
	];
    
    var levels = ['A','B','C','D','E'];
    
	var cResultBloodLust = states[0].desc;//cStateBloodLust;
	var cResultNormal = states[1].desc;//cStateNormal;
	var cResultShaken = states[2].desc;//cStateShaken;
	var cResultShakenBack1 = states[2].desc + ' b1 *';//cStateShaken + ' b1 *';
	var cResultDisorganizedBack1 = states[3].desc + ' b1 *';//cStateDisorganized + ' b1 *';
	var cResultDisorganizedBack2 = states[3].desc + ' b2 s1 **';//cStateDisorganized + ' b2 s1 **';
	var cResultRouted = states[4].desc + ' b2 s3 **';//cStateRouted + ' b2 s3 **';

    var results = [
    	{
        	level: 'A+', 
            results: [
            	{result: cResultBloodLust, low: 11, high: 16}, 
                {result: cResultNormal, low: 21, high: 54}, 
                {result: cResultShaken, low: 55, high: 62}, 
                {result: cResultShakenBack1, low: 63, high: 64}, 
                {result: cResultDisorganizedBack1, low: 65, high: 65}, 
                {result: cResultDisorganizedBack2, low: 66, high: 66}, 
                {result: cResultRouted, low: 0, high: 0}
            ]
		},
        {            
        	level: 'A',  
            results: [
            	{result: cResultBloodLust, low: 11, high: 15}, 
                {result: cResultNormal, low: 16, high: 53}, 
                {result: cResultShaken, low: 54, high: 62}, 
                {result: cResultShakenBack1, low: 63, high: 64}, 
                {result: cResultDisorganizedBack1, low: 65, high: 65}, 
                {result: cResultDisorganizedBack2, low: 66, high: 66}, 
                {result: cResultRouted, low: 0, high: 0}
			]                
        },
        
        {
        	level: 'B+', 
            results: [
            	{result: cResultBloodLust, low: 11, high: 14}, 
                {result: cResultNormal, low: 15, high: 53}, 
                {result: cResultShaken, low: 54, high: 62}, 
                {result: cResultShakenBack1, low: 63, high: 64}, 
                {result: cResultDisorganizedBack1, low: 65, high: 65}, 
                {result: cResultDisorganizedBack2, low: 66, high: 66}, 
                {result: cResultRouted, low: 0, high: 0  }
			]
		},
        {
        	level: 'B',  
            results: [
            	{result: cResultBloodLust, low: 11, high: 13}, 
                {result: cResultNormal, low: 14, high: 46}, 
                {result: cResultShaken, low: 51, high: 55}, 
                {result: cResultShakenBack1, low: 56, high: 62}, 
                {result: cResultDisorganizedBack1, low: 63, high: 64}, 
                {result: cResultDisorganizedBack2, low: 65, high: 65}, 
                {result: cResultRouted, low: 66, high: 66}
            ]
        },
        {
        	level: 'C+', 
            results: [
                {result: cResultBloodLust, low: 11, high: 12}, 
                {result: cResultNormal, low: 13, high: 45}, 
                {result: cResultShaken, low: 46, high: 55}, 
                {result: cResultShakenBack1, low: 56, high: 62}, 
                {result: cResultDisorganizedBack1, low: 63, high: 64}, 
                {result: cResultDisorganizedBack2, low: 65, high: 65}, 
                {result: cResultRouted, low: 66, high: 66}
            ]
		},       
        {
        	level: 'C',  
            results: [
            	{result: cResultBloodLust, low: 11, high: 12}, 
                {result: cResultNormal, low: 13, high: 42}, 
                {result: cResultShaken, low: 43, high: 53}, 
                {result: cResultShakenBack1, low: 54, high: 61}, 
                {result: cResultDisorganizedBack1, low: 62, high: 63}, 
                {result: cResultDisorganizedBack2, low: 64, high: 65}, 
                {result: cResultRouted, low: 66, high: 66}
            ]
        },
        {
        	level: 'D+', 
            results: [
            	{result: cResultBloodLust, low: 11, high: 11}, 
                {result: cResultNormal, low: 12, high: 33}, 
                {result: cResultShaken, low: 34, high: 45}, 
                {result: cResultShakenBack1, low: 46, high: 55}, 
                {result: cResultDisorganizedBack1, low: 56, high: 62}, 
                {result: cResultDisorganizedBack2, low: 63, high: 64}, 
                {result: cResultRouted, low: 65, high: 66}
			]                
        },
        {
        	level: 'D',  
            results: [
            	{result: cResultBloodLust, low: 11, high: 11}, 
                {result: cResultNormal, low: 12, high: 26}, 
                {result: cResultShaken, low: 31, high: 44}, 
                {result: cResultShakenBack1, low: 45, high: 55}, 
                {result: cResultDisorganizedBack1, low: 56, high: 62}, 
                {result: cResultDisorganizedBack2, low: 63, high: 64}, 
                {result: cResultRouted, low: 65, high: 66}
			]                
        },
        {
        	level: 'E+', 
            results: [
            	{result: cResultBloodLust, low: 11, high: 11}, 
                {result: cResultNormal, low: 12, high: 25}, 
                {result: cResultShaken, low: 26, high: 43}, 
                {result: cResultShakenBack1, low: 44, high: 54}, 
                {result: cResultDisorganizedBack1, low: 55, high: 62}, 
                {result: cResultDisorganizedBack2, low: 63, high: 64}, 
                {result: cResultRouted, low: 65, high: 66}
			]                
        },
        {
        	level: 'E',  
            results: [
            	{result: cResultBloodLust, low: 0, high: 0}, 
                {result: cResultNormal, low: 11, high: 21}, 
                {result: cResultShaken, low: 22, high: 36}, 
                {result: cResultShakenBack1, low: 41, high: 52}, 
                {result: cResultDisorganizedBack1, low: 53, high: 56}, 
                {result: cResultDisorganizedBack2, low: 61, high: 63}, 
                {result: cResultRouted, low: 64, high: 66}
			]                
        },
        {
        	level: 'F+', 
            results: [
            	{result: cResultBloodLust, low: 0, high: 0}, 
                {result: cResultNormal, low: 11, high: 14}, 
                {result: cResultShaken, low: 15, high: 34}, 
                {result: cResultShakenBack1, low: 35, high: 51}, 
                {result: cResultDisorganizedBack1, low: 52, high: 56}, 
                {result: cResultDisorganizedBack2, low: 61, high: 63}, 
                {result: cResultRouted, low: 64, high: 66}
            ]
        },
        {
        	level: 'F',  
            results: [
            	{result: cResultBloodLust, low: 0, high: 0}, 
                {result: cResultNormal, low: 11, high: 13}, 
                {result: cResultShaken, low: 14, high: 33}, 
                {result: cResultShakenBack1, low: 34, high: 46}, 
                {result: cResultDisorganizedBack1, low: 51, high: 55}, 
                {result: cResultDisorganizedBack2, low: 56, high: 63}, 
                {result: cResultRouted, low: 64, high: 66}
            ]
        },
        {
        	level: 'G+', 
            results: [
            	{result: cResultBloodLust, low: 0, high: 0}, 
                {result: cResultNormal, low: 0, high: 0}, 
                {result: cResultShaken, low: 11, high: 31}, 
                {result: cResultShakenBack1, low: 32, high: 44}, 
                {result: cResultDisorganizedBack1, low: 45, high: 54}, 
                {result: cResultDisorganizedBack2, low: 55, high: 62}, 
                {result: cResultRouted, low: 63, high: 66}
			]                
        },
        {
        	level: 'G',  
            results: [
            	{result: cResultBloodLust, low: 0, high: 0}, 
                {result: cResultNormal, low: 0, high: 0}, 
                {result: cResultShaken, low: 11, high: 24}, 
                {result: cResultShakenBack1, low: 25, high: 42}, 
                {result: cResultDisorganizedBack1, low: 43, high: 52}, 
                {result: cResultDisorganizedBack2, low: 53, high: 61}, 
                {result: cResultRouted, low: 62, high: 66}
			]                
        },
        {
        	level: 'H+', 
            results: [
            	{result: cResultBloodLust, low: 0, high: 0}, 
                {result: cResultNormal, low: 0, high: 0}, 
                {result: cResultShaken, low: 11, high: 22}, 
                {result: cResultShakenBack1, low: 23, high: 36}, 
                {result: cResultDisorganizedBack1, low: 41, high: 46}, 
                {result: cResultDisorganizedBack2, low: 51, high: 56}, 
                {result: cResultRouted, low: 61, high: 66}
			]                
        }
    ];
				
	function isBloodLust(state) {
    	return state == cStateBloodLust;
    }
	function isNormal(state) {
    	return state == cStateNormal;
    }
	function isShaken(state) {
    	return state == cStateShaken;
    }
	function isDisorganized(state) {
    	return state == cStateDisorganized;
    }
	function isRouted(state) {
    	return state == cStateRouted;
    }
    
	var Morale = {
    	
        states: states,
        levels: levels,
        
        defaultState: states[1],
        defaultLevel: levels[1],
        
		isBloodLust: function(state) {
	    	return state == cStateBloodLust;
	    },
		isNormal: function(state) {
	    	return state == cStateNormal;
	    },
		isShaken: function(state) {
	    	return state == cStateShaken;
	    },
		isDisorganized: function(state) {
	    	return state == cStateDisorganized;
	    },
		isRouted: function(state) {
	    	return state == cStateRouted;
	    },
        
        check: function(dice, level, leaderrating, leaderloss, state, unlimbarty, wreckedbde, wreckeddiv, trench, 
        				night, column, lowammo, ccdefender, ccattacker, ccattackerspecial, mod) {
			
            var result = 'NE';
			
			if (isRouted(state)) {
            	result = cStateRouted;
            }
            else if (isBloodLust(state)) {
				if (dice >= 44) {
					result = 'Remove ' + cStateBloodLust;
				}                    
				else {//if (dice >= 11 && dice <= 43)
					result = cStateBloodLust;
				}                    
			}
			else {
            	var ilevel = _.findIndex(results, function(mr) {
                	return mr.level == level;
                });
				if (ilevel < 0)
					ilevel = results.length - 1;
				
				// modify level
				// these modifications are sign-opposite to those on the game table:
				//      in computer land, - is up the table and + is down the table...
				ilevel -= mod;
				
				if (trench) {
					ilevel -= 3;
				}                    
				if (unlimbarty) {
					ilevel--;
				}					
				leaderrating--;
				if (leaderloss) {
					leaderrating *= -1;
				}                    
					
				ilevel -= leaderrating;
					
				if (lowammo) {
					ilevel++;
				}                    
				if (night) {
					ilevel += 3;
				}                    
				if (column) {
					ilevel += 6;
				}                    
				if (wreckedbde) {
					ilevel += 4;
				}                    
				else if (wreckeddiv) {
					ilevel += 6;
				}                    
				if (ccdefender) {
					ilevel += 4;
				}                    
				if (ccattackerspecial) {
					ilevel += 8;
				}                    
				else if (ccattacker) {
					ilevel += 6;
				}
				
				if (isShaken(state)) {
					ilevel++;
				}
				else if (isDisorganized(state)) {
					ilevel += 3;
				}
				else if (isRouted(state)) {
					ilevel += 6;
				}
					
				if (ilevel < 0) {
					ilevel = 0;
				}
				else if (ilevel >= results.length) {
					ilevel = results.length - 1;
				}
					
				var mr = _.find(results[ilevel].results, function(m) {
                	return (dice >= m.low && dice <= m.high);
                });
                if (mr) {
                	result = mr.result;
                }
			}
            
	    	var state = _.find(states, function(st) {
	        	return st.code == result;
	        });
	        if (state) {
	        	result = state.desc;
			}                        
            return result;
		},
		
        rally: function(die, state, leaderrating) {
        	return (isRouted(state) && (die - leaderrating <= 2)) ? 'Rally' : 'NE';
		}        
	};	
	
	return Morale;
});
