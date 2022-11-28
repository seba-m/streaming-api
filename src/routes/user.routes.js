const { profile, stream, updateProfile, updateStream, deleteAccount, updateStreamKey, updateContact, updateColor } = require('../controller/user.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');


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

    app.post('/api/user/profile/settings', [verifyToken], updateProfile);

    app.post('/api/user/profile/stream', [verifyToken], updateStream);

    app.post('/api/user/profile/contact', [verifyToken], updateContact);

    app.post('/api/user/profile/key', [verifyToken], updateStreamKey);

    app.post('/api/user/profile/color', [verifyToken], updateColor);

    app.delete('/api/user/profile/delete', [verifyToken], deleteAccount);
};