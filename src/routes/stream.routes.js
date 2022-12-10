const {
    viewStreamer,
    topStreamers,
    following,
    follow,
    unfollow,
    topCategories,
} = require("../controller/stream.controller");

const { verifyToken } = require('../middlewares/jwt.middleware');
const { query } = require('express-validator');

module.exports = function (app) {
    app.get('/api/stream/view/:streamName', viewStreamer);

    app.get('/api/stream/top', 
        [
            query('page')
                .escape()
                .whitelist('[0-9]')
                .toInt(),
            query('limit')
                .escape()
                .whitelist('[0-9]')
                .toInt()
        ]
        , topStreamers);

    app.get('/api/category/top', topCategories);

    app.get('/api/stream/following', [verifyToken], following);

    app.post("/api/stream/follow", [verifyToken], follow);

    app.post("/api/stream/unfollow", [verifyToken], unfollow);
};
