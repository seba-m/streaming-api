var express = require('express');

var router = express.Router();

/* ONLY FOR DEVELOPMENT */
router.get('/:streamerName', function (req, res, next) {
    var streamerName = req.params.streamerName;
    
    res.status(404);
});

module.exports = router;