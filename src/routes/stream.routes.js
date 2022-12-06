const {
    viewStreamer,
    topStreamers,
    following,
    follow,
    unfollow,
    topCategories,
} = require("../controller/stream.controller");
const { verifyToken } = require('../middlewares/jwt.middleware');

module.exports = function (app) {
    app.get('/api/stream/view/:streamName', viewStreamer);

    app.get('/api/stream/top', topStreamers);

    app.get('/api/category/top', topCategories);

    app.get('/api/stream/following', [verifyToken], following);

    app.post("/api/stream/follow", [verifyToken], follow);

    app.post("/api/stream/unfollow", [verifyToken], unfollow);
};
