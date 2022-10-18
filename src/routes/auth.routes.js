const { checkDuplicateUsernameOrEmail, signin, signup } = require('../controller/auth.controller');

module.exports = function (app) {

    // url, callback & function
    app.post('/apiV1/auth/signup', [checkDuplicateUsernameOrEmail], signup);

    app.post('/apiV1/auth/signin', signin);
};