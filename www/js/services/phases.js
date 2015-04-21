angular.module('cwb.services')

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
});
