'use strict';

describe('battles', function() {
    var expect = chai.expect;
    var env = {};

	beforeEach(function() {
    	module('cwb.services')
    	env = {};
        env.url = '/data/battles.json';
        env.ionic = ionic || {};
        env.ionic.Platform = ionic.Platform || {};
        env.ionic.Platform.isAndroid = ionic.Platform.isAndroid || function() {};
        sinon.stub(env.ionic.Platform, 'isAndroid');
        inject(function($window) {
        	$window.ionic = env.ionic;
		});
    	env.battlesjson = [
        	{
				"id" : 1,
				"title" : "battle1",
				"img" : "battle1.jpg",
				"armies" : [],
				"dayTimeIncr" : 30,
				"nightTimeIncr" : 60,
				"dawnTime" : "05:30",
				"duskTime" : "19:00",
				"randomEvents" : ["None"],
				"scenarios" : []
            },
            {
				"id" : 2,
				"title" : "battle2",
				"img" : "battle2.jpg",
				"armies" : [],
				"dayTimeIncr" : 30,
				"nightTimeIncr" : 60,
				"dawnTime" : "05:30",
				"duskTime" : "19:00",
				"randomEvents" : ["None"],
				"scenarios" : []
            },
            {
				"id" : 3,
				"title" : "battle3",
				"img" : "battle3.jpg",
				"armies" : [],
				"dayTimeIncr" : 30,
				"nightTimeIncr" : 60,
				"dawnTime" : "05:30",
				"duskTime" : "19:00",
				"randomEvents" : ["None"],
				"scenarios" : [
                	{
						"id" : 1,
						"title" : "April's Harvest",
						"startDateTime" : "1862-04-06T10:30:00.000Z",
						"endDateTime" : "1862-04-07T22:30:00.000Z",
						"firstPlayer" : "Union",
						"confederateAmmo" : 999,
						"confederateCasualty" : 0,
						"unionAmmo" : 999,
						"unionCasualty" : 0,
						"defaultOrders" : []
                    },
                    {
						"id" : 2,
						"title" : "Second Battle of Bull Run",
						"startDateTime" : "1862-08-28T21:30:00.000Z",
						"endDateTime" : "1862-08-30T23:30:00.000Z",
						"firstPlayer" : "Confederate",
						"confederateAmmo" : 300,
						"confederateCasualty" : 0,
						"unionAmmo" : 350,
						"unionCasualty" : 0,
						"defaultOrders" : []
                    }
                ]
            }
        ];
    
    });
	afterEach(function() {
    	env.ionic.Platform.isAndroid.restore();
    });
    
    describe('Interface', function() {
	    beforeEach(inject(function(Battles) {
        	env.battles = Battles;
	    }));
	    it('should contain a Battles service', function() {
	        expect(env.battles).to.exist;
	        expect(env.battles).to.respondTo('load');
	        expect(env.battles).to.respondTo('save');
	        expect(env.battles).to.respondTo('get');
	        expect(env.battles).to.respondTo('getScenario');
	    });
    });
    
    describe('load', function() {
    	beforeEach(inject(function($rootScope, $httpBackend) {
        	env.$rootScope = $rootScope;
        	env.$httpBackend = $httpBackend;
        }));
		afterEach(function() {
        	env.$httpBackend.verifyNoOutstandingExpectation();
            env.$httpBackend.verifyNoOutstandingRequest();
		});
        
	    describe('desktop', function() {
		    beforeEach(inject(function(Battles) {
	        	env.battles = Battles;
		    }));
        	describe('success', function() {
	        	beforeEach(function(done) {
	            	env.gethandler = env.$httpBackend.when('GET', env.url).respond(200, env.battlesjson);
	            	env.$httpBackend.expectGET(env.url);
                    env.promise = env.battles.load();
                    env.$httpBackend.flush();
                    env.promise
                	.then(function(data) {
                    	env.data = data;
                    	done();
                    })
                    .catch(done);
                    env.$rootScope.$digest();
	            });
                it('should retrieve the data', function() {
                	expect(env.data).to.exist;
                    expect(env.data).to.have.length(3);
                });
            });
        	describe('failure', function() {
	        	beforeEach(function(done) {
	            	env.gethandler = env.$httpBackend.when('GET', env.url).respond(500, 'bad stuff', null, 'no battles here');
	            	env.$httpBackend.expectGET(env.url);
                    env.promise = env.battles.load();
                    env.$httpBackend.flush();
                    
                    env.promise
                    .then(done)
                	.catch(function(err) {
                    	env.error = err;
                    	done();
                    });
                    env.$rootScope.$digest();
	            });
                
                it('should not retrieve any data', function() {
                	expect(env.data).to.not.exist;
                });
                
                it('should not receive the errordata', function() {
                	expect(env.error).to.exist;
                	expect(env.error).to.equal('bad stuff');
                });
            });
        });
    	
	    describe('android', function() {
        	beforeEach(function() {
            	env.ionic.Platform.isAndroid.returns(true);
                env.url = 'file:///android_asset/www' + env.url;
                inject(function(Battles) {
                	env.battles = Battles;
				});
            });
        
        	describe('success', function() {
	        	beforeEach(function(done) {
	            	env.gethandler = env.$httpBackend.when('GET', env.url).respond(200, env.battlesjson);
	            	env.$httpBackend.expectGET(env.url);
                    env.promise = env.battles.load();
                    env.$httpBackend.flush();
                    env.promise
                	.then(function(data) {
                    	env.data = data;
                    	done();
                    })
                    .catch(done);
                    env.$rootScope.$digest();
	            });
                it('should retrieve the data', function() {
                	expect(env.data).to.exist;
                    expect(env.data).to.have.length(3);
                });
            });
        	describe('failure', function() {
	        	beforeEach(function(done) {
	            	env.gethandler = env.$httpBackend.when('GET', env.url).respond(500, 'bad stuff', null, 'no battles here');
	            	env.$httpBackend.expectGET(env.url);
                    env.promise = env.battles.load();
                    env.$httpBackend.flush();
                    
                    env.promise
                    .then(done)
                	.catch(function(err) {
                    	env.error = err;
                    	done();
                    });
                    env.$rootScope.$digest();
	            });
                
                it('should not retrieve any data', function() {
                	expect(env.data).to.not.exist;
                });
                
                it('should not receive the errordata', function() {
                	expect(env.error).to.exist;
                	expect(env.error).to.equal('bad stuff');
                });
            });
        });
    });
    
    describe('get', function() {
    	beforeEach(function(done) {
        	inject(function($rootScope, $httpBackend, Battles) {
        		env.$rootScope = $rootScope;
	        	env.$httpBackend = $httpBackend;
	            env.battles = Battles;
			});                
	        env.gethandler = env.$httpBackend.when('GET', env.url).respond(200, env.battlesjson);
            env.battles.load()
        	.then(function() {
            	done();
            })
            .catch(done);
            env.$httpBackend.flush();
            env.$rootScope.$digest();
        });
		afterEach(function() {
        	env.$httpBackend.verifyNoOutstandingExpectation();
            env.$httpBackend.verifyNoOutstandingRequest();
		});
        
	    describe('battle', function() {
		    beforeEach(function(done) {
            	env.battles.get(env.battlesjson[1].id)
	        	.then(function(data) {
	            	env.data = data;
	            	done();
	            })
	            .catch(done);
                env.$rootScope.$digest();
		    });
            it('should retrieve the battle', function() {
            	expect(env.data).to.exist;
            	expect(env.data).to.deep.equal(env.battlesjson[1]);
            });
        });
        
	    describe('scenario', function() {
		    beforeEach(function(done) {
            	env.expected = angular.copy(env.battlesjson[2].scenarios[1]);
                env.expected.armies = _.map(env.battlesjson[2].armies, function(army) {
                    return {
                        country: army.country,
                        name: army.name,
                        commander: army.commander,
                        roster: angular.copy(army.roster)
                    };
                });
                env.expected.battle = {
	            	title: env.battlesjson[2].title,
	                dayTimeIncr: env.battlesjson[2].dayTimeIncr,
	                nightTimeIncr: env.battlesjson[2].nightTimeIncr,
	                dawnTime: env.battlesjson[2].dawnTime,
	                duskTime: env.battlesjson[2].duskTime
				};
                
            	env.battles.getScenario(env.battlesjson[2].scenarios[1].id)
	        	.then(function(data) {
	            	env.data = data;
	            	done();
	            })
	            .catch(done);
                env.$rootScope.$digest();
		    });
            it('should retrieve the scenario', function() {
            	expect(env.data).to.exist;
            	expect(env.data).to.deep.equal(env.expected);
            });
        });
    });
});
