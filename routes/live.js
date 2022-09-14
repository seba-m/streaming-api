var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:streamId', function(req, res, next) {
  res.send(`
<script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
<!-- Or if you want the latest version from the main branch -->
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script> -->
<video id="video"></video>
<script>
  var video = document.getElementById('video');
  var videoSrc = 'http://localhost:8000/live/${req.params.streamId}/index.m3u8';
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
  }
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
  }
</script>
  `);
});

router.get('/', function (req, res, next) {
  res.send(`
a
  `);
});

module.exports = router;
