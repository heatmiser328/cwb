angular.module('cwb.services')

.factory('Sound', function(MediaSrv) {
	return {
    	play: function() {
        	MediaSrv.loadMedia('snd/droll.wav').then(function(media){
            	media.play();
			});
        }
    };
});
