const {
    viewStreamer,
    topStreamers,
    following,
    follow,
    unfollow,
    topCategories,
    isFollowing,
} = require("../controller/stream.controller");

const { verifyToken } = require('../middlewares/jwt.middleware');
const { query, body, param } = require('express-validator');

module.exports = function (app) {
    app.get('/api/stream/view/:streamName', 
    [
        param('streamName')
            .not().isEmpty()
            .withMessage('Stream name is required')
            .escape()
            .trim()
            .isLength({ min: 3, max: 20 })
            .withMessage('Stream name must be between 3 and 20 characters long')
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Invalid Streamer name')
    ]
    ,viewStreamer);

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

    app.get('/api/stream/following', [
        verifyToken,
        query('page')
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('limit')
            .escape()
            .whitelist('[0-9]')
            .toInt()
    ], following);

    app.get('/api/stream/following/:streamName', [
        verifyToken,
        param('streamName')
            .not().isEmpty()
            .withMessage('Stream name is required')
            .escape()
            .trim()
            .isLength({ min: 3, max: 20 })
            .withMessage('Stream name must be between 3 and 20 characters long')
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Invalid Streamer name')
    ], isFollowing);

    app.post("/api/stream/follow", 
        [
            verifyToken,
            body('streamerName')
                .not().isEmpty()
                .withMessage('Stream name is required')
                .escape()
                .trim()
                .isLength({ min: 3, max: 20 })
                .withMessage('Stream name must be between 3 and 20 characters long')
                .matches(/^[a-zA-Z0-9]+$/)
                .withMessage('Invalid Streamer name')

        ], follow);

    app.post("/api/stream/unfollow", 
        [
            verifyToken,
            body('streamerName')
                .not().isEmpty()
                .withMessage('Stream name is required')
                .escape()
                .trim()
                .isLength({ min: 3, max: 20 })
                .withMessage('Stream name must be between 3 and 20 characters long')
                .matches(/^[a-zA-Z0-9]+$/)
                .withMessage('Invalid Streamer name')
        ], unfollow);
};
