'use strict';

describe('sound', function() {
    var expect = chai.expect;
    var env = {};

	beforeEach(module('cwb.services'));
	beforeEach(function() {
    	env = {};
        env.media = {
        	play: sinon.stub()
        };
        env.MediaSrv = {
        	loadMedia: sinon.stub()
		};
	    module(function($provide) {
	    	$provide.factory('MediaSrv', function() {
	        	return env.MediaSrv;
			});
		});
    });
    
    beforeEach(inject(function(Sound) {
        env.Sound = Sound;
    }));
    
    it('should contain a Sound service', function() {
        expect(env.Sound).to.exist;
    });
    
    describe('play', function() {
	    beforeEach(inject(function($q) {
	        env.MediaSrv.loadMedia.returns($q(function(resolve, reject) {resolve(env.media);}));
            
            env.Sound.play();
	    }));
    
	    it('should play a sound', function() {
	        expect(env.MediaSrv.loadMedia).to.have.been.calledOnce;
	        expect(env.MediaSrv.loadMedia.getCall(0).args[0]).to.equal('snd/droll.wav');
	        expect(env.media.play).to.have.been.calledOnce;
	    });
    });
});
