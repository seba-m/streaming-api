const { viewStreamer, topStreamers, following } = require('../controller/stream.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');

module.exports = function (app) {
    app.get('/api/stream/view/:streamName', viewStreamer);

    app.get('/api/stream/top', topStreamers);

    app.get('/api/stream/following', [verifyToken], following);
};
