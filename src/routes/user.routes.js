const { profile, stream, updateProfile, updateStream, deleteAccount, updateStreamKey, updateContact, updateColor, getColor } = require('../controller/user.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');

const { query, body, param } = require('express-validator');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/user/profile', verifyToken , profile);

    app.get('/api/user/stream', [verifyToken], stream);

    app.get('/api/user/color/:username', [
        param('username')
            .not().isEmpty()
            .withMessage('Streamer name is required')
            .trim()
            .escape()
            .isLength({ min: 3, max: 20 })
            .withMessage('Streamer name must be between 3 and 20 characters long')
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Invalid Streamer name')
    ], getColor);


    app.post('/api/user/profile/settings', [verifyToken], updateProfile);

    app.post('/api/user/profile/stream', [verifyToken], updateStream);

    app.post('/api/user/profile/contact', [
        verifyToken,
        body('password')
            .isLength({ min: 6, max: 40 })
            .withMessage('Password must be between 6 and 40 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
        body('newPassword')
            .isLength({ min: 6, max: 40 })
            .withMessage('Password must be between 6 and 40 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
        
    ], updateContact);

    app.post('/api/user/profile/key', [verifyToken], updateStreamKey);

    app.post('/api/user/profile/color', [
        verifyToken,
        body('color')
            .not().isEmpty()
            .withMessage('Color is required')
            .escape()
            .trim()
            .isLength({ min: 4, max: 7 })
            .withMessage('Invalid hex color value')
            .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i)
            .withMessage('Invalid hex color value')
    ], updateColor);

    app.delete('/api/user/profile/delete', [verifyToken], deleteAccount);
};