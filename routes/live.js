var express = require('express');

var router = express.Router();

/* ONLY FOR DEVELOPMENT */
router.get('/:streamId', function (req, res, next) {
	res.send(`
	<video id="videoElement"></video>
	<script>
		if (mpegts.getFeatureList().mseLivePlayback) {
			var videoElement = document.getElementById('videoElement');
			var player = mpegts.createPlayer({
				type: 'flv',
				isLive: true,
				url: 'http://localhost:8000/live/${req.params.streamId}.flv'
			});
			player.attachMediaElement(videoElement);
			player.load();
			player.play();
		}
	</script>
	`);
});

/*
router.get('/:streamName', function (req, res, next) {

	//TODO: search over db for stream id using streamer name

	res.send(`
	<video id="videoElement"></video>
	<script src="http://localhost:9000/js/mpegts.js"></script>
	<script>
		if (mpegts.getFeatureList().mseLivePlayback) {
			var videoElement = document.getElementById('videoElement');
			var player = mpegts.createPlayer({
				type: 'flv',
				isLive: true,
				url: 'http://localhost:8000/live/${req.params.streamId}.flv'
			});
			player.attachMediaElement(videoElement);
			player.load();
			player.play();
		}
	</script>
	`);
});
*/
module.exports = router;
