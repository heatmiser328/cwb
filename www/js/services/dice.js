angular.module('cwb.services')

.factory('Dice', function($window, Sound) {

	function randomBetween(low, high) {
    	return $window.Math.floor(Math.random()*(high-low+1)) + low;
    }
	
    function Die(low, high) {
		var self = this;
        var value = low;
	    
	    self.value = function(d) {
        	if (typeof d != 'undefined') {
            	value = d;
                if (value < low) {
                	value = low;
                } else if (value > high) {
                	value = high;
                }
            }
            return value;
        }
        
	    self.increment = function(rollover) {
        	if (++value > high) {
            	value = rollover ? low : high;
            }
        }
	    self.decrement = function(rollover) {
        	if (--value < low) {
            	value = rollover ? high : low;
            }
        }
	    self.roll = function() {
	    	value = randomBetween(low, high);
	        return value;
	    }
	}

    function Dice(numdice, low, high) {
		var self = this;
	    var dice = [];
        for (var i=0; i<numdice; i++) {
        	dice.push(new Die(low, high));
		}
        
		self.count = function() {
	    	return dice.length;
	    }    
	    
	    self.dieEx = function(i) {
	    	if (--i >= 0 && i < dice.length) {
	        	return dice[i];
	        }
            return {};
	    }
        
	    self.die = function(i, d) {
        	var o = self.dieEx(i);
        	if (typeof d != 'undefined' && o.hasOwnProperty('value')) {
            	o.value(d);
            }
            return o.hasOwnProperty('value') ? o.value() : 0;
	    }
        
	    self.roll = function(i) {
        	if (typeof i != 'undefined') {
            	var d = self.dieEx(i);
                if (d && d.hasOwnProperty('roll')) {
                	d.roll();
                    return d.value();
                }
                return 0;
            }
        	
	        Sound.play();
	    	for (var i=0; i<dice.length; i++) {
	        	dice[i].roll();
	        }
	    }
	}
    
	return {
		Die: Die,
		Dice: Dice
    };
    
});
