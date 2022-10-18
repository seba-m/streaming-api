

module.exports = function (app) {
    app.route('/apiV1/user/:userName')
        .get((req, res, next) => {
            next(new Error('not implemented'))
        })
        .put((req, res, next) => {
            next(new Error('not implemented'))
        })
        .post((req, res, next) => {
            next(new Error('not implemented'))
        })
        .delete((req, res, next) => {
            next(new Error('not implemented'))
        });
};