'use strict';

describe('dice', function() {
    var expect = chai.expect;
    var env = {};

	beforeEach(module('cwb.services'));
	beforeEach(function() {
    	env = {};
        env.Sound = {
        	play: sinon.stub()
		};
        env.Math = {
        	floor: Math.floor,
            random: sinon.stub()
        };
        
	    module(function($provide) {
	    	$provide.factory('Sound', function() {
	        	return env.Sound;
			});
		});
    });
    beforeEach(inject(function(Dice, $window) {
    	$window.Math = env.Math;
        env.Dice = Dice;
    }));
    
    it('should contain a Dice service', function() {
        expect(env.Dice).to.exist;
    });
    
    describe('Die', function() {
	    describe('6 sided die', function() {
        	beforeEach(function() {
            	env.die = new env.Dice.Die(1,6);
            });
            
            describe('get value', function() {
	            it('should default value to 1', function() {
	            	expect(env.die.value()).to.equal(1);
	            });
            });
            
            describe('set value', function() {
	            describe('in range', function() {
		            it('should set value to 3', function() {
	                	env.die.value(3);
		            	expect(env.die.value()).to.equal(3);
		            });
				});
	            describe('below range', function() {
		            it('should set value to 1', function() {
	                	env.die.value(-4);
		            	expect(env.die.value()).to.equal(1);
		            });
				});
	            describe('above range', function() {
		            it('should set value to 6', function() {
	                	env.die.value(11);
		            	expect(env.die.value()).to.equal(6);
		            });
				});
            });
            
            describe('increment value', function() {
	            describe('in range', function() {
		            it('should set value to 2', function() {
	                	env.die.increment();
		            	expect(env.die.value()).to.equal(2);
		            });
				});
	            describe('above range', function() {
		            it('should set value to 6', function() {
	                	env.die.value(6);
	                	env.die.increment();
		            	expect(env.die.value()).to.equal(6);
		            });
				});
	            describe('above range with rollover', function() {
		            it('should set value to 1', function() {
	                	env.die.value(6);
	                	env.die.increment(true);
		            	expect(env.die.value()).to.equal(1);
		            });
				});
            });
            
            describe('decrement value', function() {
	            describe('in range', function() {
		            it('should set value to 3', function() {
	                	env.die.value(4);
	                	env.die.decrement();
		            	expect(env.die.value()).to.equal(3);
		            });
				});
	            describe('below range', function() {
		            it('should set value to 1', function() {
	                	env.die.decrement();
		            	expect(env.die.value()).to.equal(1);
		            });
				});
	            describe('below range with rollover', function() {
		            it('should set value to 6', function() {
	                	env.die.decrement(true);
		            	expect(env.die.value()).to.equal(6);
		            });
				});
            });
            
            describe('roll', function() {
            	beforeEach(function() {
                	env.Math.random.returns(0.5);
                	env.die.roll();
                });
            	it('should invoke the randomization', function() {
                	expect(env.Math.random).to.have.been.called;
                });
                
            	it('should produce a "random" value', function() {
                    expect(env.die.value()).to.equal(4);
                });
            });
        });
    });
    
    describe('Dice', function() {
	    describe('2 x 6', function() {
	    	beforeEach(function() {
	        	env.dice = new env.Dice.Dice(2,1,6);
	        });
	        
	        it('should have 2 six sided die', function() {
	        	expect(env.dice).to.exist;
	        	expect(env.dice.count()).to.equal(2);
	        });
	    });
        
        describe('get', function() {
	    	beforeEach(function() {
	        	env.dice = new env.Dice.Dice(5,1,6);
	        });
        
            describe('Die', function() {
            	describe('in range', function() {
			    	beforeEach(function() {
	                	env.die = env.dice.dieEx(2);
			        });
                	it('should retrieve the second die', function() {
	                    expect(env.die).to.exist;
	                    expect(env.die).to.respondTo('value');
                    });
                });
            	describe('below range', function() {
			    	beforeEach(function() {
	                	env.die = env.dice.dieEx(0);
			        });
                	it('should retrieve an empty object', function() {
	                    expect(env.die).to.exist;
	                    expect(env.die).to.deep.equal({});
                    });
                });
            	describe('above range', function() {
			    	beforeEach(function() {
	                	env.die = env.dice.dieEx(8);
			        });
                	it('should retrieve an empty object', function() {
	                    expect(env.die).to.exist;
	                    expect(env.die).to.deep.equal({});
                    });
                });
                
            });
            
            describe('die value', function() {
	            describe('in range', function() {
		            it('should get value for the third die', function() {
	                	env.value = env.dice.die(3);
		            	expect(env.value).to.equal(1);
		            });
				});
	            describe('below range', function() {
		            it('should get 0', function() {
	                	env.value = env.dice.die(0);
		            	expect(env.value).to.equal(0);
		            });
				});
	            describe('above range', function() {
		            it('should get 0', function() {
	                	env.value = env.dice.die(8);
		            	expect(env.value).to.equal(0);
		            });
				});
            });
        });
        
        describe('set', function() {
	    	beforeEach(function() {
	        	env.dice = new env.Dice.Dice(5,1,6);
	        });
        
            describe('die value', function() {
	            describe('in range', function() {
		            it('should set value for the third die', function() {
	                	env.value = env.dice.die(3, 4);
		            	expect(env.value).to.equal(4);
		            });
				});
	            describe('below range', function() {
		            it('should get 0', function() {
	                	env.value = env.dice.die(0, 4);
		            	expect(env.value).to.equal(0);
		            });
				});
	            describe('above range', function() {
		            it('should get 0', function() {
	                	env.value = env.dice.die(8, 4);
		            	expect(env.value).to.equal(0);
		            });
				});
            });
        });
        
        describe('roll', function() {
        	describe('all', function() {
		    	beforeEach(function() {
		        	env.dice = new env.Dice.Dice(5,1,6);
	                
	            	env.Math.random.onCall(0).returns(3/6);
	            	env.Math.random.onCall(1).returns(2/6);
	            	env.Math.random.onCall(2).returns(1/6);
	            	env.Math.random.onCall(3).returns(2/6);
	            	env.Math.random.onCall(4).returns(5/6);
	                env.dice.roll();
		        });
	           
	        	it('should play a sound', function() {
	            	expect(env.Sound.play).to.have.been.calledOnce;
	            });
	           
	        	it('should invoke the randomization', function() {
	            	expect(env.Math.random.callCount).to.equal(5);
	            });
	            
	        	it('should produce the "random" values', function() {
	                expect(env.dice.die(1)).to.equal(4);
	                expect(env.dice.die(2)).to.equal(3);
	                expect(env.dice.die(3)).to.equal(2);
	                expect(env.dice.die(4)).to.equal(3);
	                expect(env.dice.die(5)).to.equal(6);
	            });
            });
            
        	describe('individual', function() {
		    	beforeEach(function() {
		        	env.dice = new env.Dice.Dice(5,1,6);
	                
	            	env.Math.random.onCall(0).returns(3/6);
	                env.dice.roll(3);
		        });
	           
	        	it('should not play a sound', function() {
	            	expect(env.Sound.play).to.not.have.been.called;
	            });
	           
	        	it('should invoke the randomization', function() {
	            	expect(env.Math.random).to.have.been.calledOnce;
	            });
	            
	        	it('should produce the "random" value', function() {
	                expect(env.dice.die(3)).to.equal(4);
	            });
                
	        	it('should leave other dice unchanged', function() {
	                expect(env.dice.die(1)).to.equal(1);
	                expect(env.dice.die(2)).to.equal(1);
	                expect(env.dice.die(4)).to.equal(1);
	                expect(env.dice.die(5)).to.equal(1);
	            });
                
            });
            
        });
        
    });
});
