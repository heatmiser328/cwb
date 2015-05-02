angular.module('cwb.services')

.factory('Melee', function($log) {

	var cLevelAA = 'AA';
	var cLevelAB = 'AB';
	var cLevelA = 'A';
	var cLevelB = 'B';
	var cLevelC = 'C';
	var cLevelArty = 'Arty';

	var levels = [
    	{
        	code: cLevelAA,
            points: 6
		},            
    	{
        	code: cLevelAB,
            points: 5
		},            
    	{
        	code: cLevelA,
            points: 4
		},            
    	{
        	code:cLevelB ,
            points: 2
		},            
    	{
        	code: cLevelC,
            points: 1
		},            
    	{
        	code: cLevelArty,
            points: 1
		}            
    ];

    var results = [
    	{
        	odds: -2, 
            results: ['Defender', 'Defender', 'Defender', 'Defender', 'Defender', 'Attacker']
		},
    	{
        	odds: 1, 
            results: ['Defender', 'Defender',   'Defender',   'Defender',   '1/2', 'Attacker']
		},
    	{
        	odds: 2, 
            results: ['Defender', 'Defender',   'Defender',   '1/2', 'Attacker',   'Attacker']
		},
    	{
        	odds: 3, 
            results: ['Defender', 'Defender',   '1/2', 'Attacker',   'Attacker',   'Attacker']
		},
    	{
        	odds: 4, 
            results: ['Defender', '1/2', '1/2', 'Attacker',   'Attacker',   'Attacker']
		}
    ];
		
	function ccPoints(lvls) {
    	var pts = _.reduce(lvls, function(memo, lvl) { 
        	var l = _.find(levels, function(level) {
            	return level.code == lvl;
			});                
        	return memo + (l ? l.points : 0); 
		}, 0);
		return Math.min(pts, 6);
	}
    
    function getCCPoints(attacklevels, defendlevels, defendtrench) {
        var attackpts = ccPoints(attacklevels);
        var defendpts = ccPoints(defendlevels);
		
		if (defendtrench) {
			defendpts *= 2;
		}                
        return {
        	attacker: attackpts,
            defender: defendpts
        };
    }
        
	function calcOdds(attacklevels, defendlevels, defendtrench) {
		var pts = getCCPoints(attacklevels, defendlevels, defendtrench);
    
    	var odds = (pts.attacker >= pts.defender)
        	? Math.ceil(pts.attacker / pts.defender)
            : Math.ceil(pts.defender / pts.attacker) * -1;
		
		if (odds < -2) {
        	odds = -2;
		}
		else if (odds > 4) {
        	odds = 4;
		}
	
    	return {
        	odds: odds,
            text: odds < 0 
            	? ('1:' + (-1*odds))
                : odds + ':1'
		};                    
	}								
        		
	var CloseCombat = {
    	defaultLevel: cLevelAA,
        levelAA: cLevelAA,
        levelAB: cLevelAB,
        levelA: cLevelA,
        levelB: cLevelB,
        levelC: cLevelC,
        levelArty: cLevelArty,
    
		calcOdds: calcOdds,
    
    	assault: function(ccdie, tiebreakerdie, odds, attackwreckedbde, defendwreckedbde, defendwreckeddiv) {
			var result = '???';
            
			var ccr = _.find(results, function(result) {
            	return result.odds == odds;
            });                
            if (ccr) {
				if (defendwreckeddiv) {
                	ccdie += 2;
				}
				else if (defendwreckeddiv) {
                	ccdie += 1;
                }
				if (attackwreckedbde) {
                	ccdie -= 2;
                }
				ccdie--; // index-ize it
				
				if (ccdie < 0) {
                	ccdie = 0;
                }
				else if (ccdie >= ccr.results.length) {
                	ccdie = ccr.results.length - 1;
                }
				
				result = ccr.results[ccdie];
				if (result == '1/2') {
                	result = (tiebreakerdie < 4) ? 'Defender' : 'Attacker';
				}
			}
            return result;
		}
	};	
	
	return CloseCombat;
});
