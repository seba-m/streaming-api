const {profile, stream, updateProfile, updateStream, deleteAccount} = require('../controller/user.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/user/profile', [verifyToken], profile);

    app.get('/api/user/stream', [verifyToken], stream);

    app.put('/api/user/profile/update', [verifyToken], updateProfile);

    app.put('/api/user/stream/update', [verifyToken], updateStream);

    app.delete('/api/user/profile/delete', [verifyToken], deleteAccount);
};