const { checkDuplicateUsernameOrEmail, signin, signup, recoverPassword, activateAccount, resetPassword } = require('../controller/auth.controller');

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // url, callback & function
    app.post('/api/auth/signup', [checkDuplicateUsernameOrEmail], signup);

    app.post('/api/auth/signin', signin);

    app.post('/api/auth/recover', recoverPassword);

    app.get('/api/auth/reset', resetPassword);

    app.get('/api/auth/activate/:key', activateAccount);
};