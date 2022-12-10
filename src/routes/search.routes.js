const { searchStream, searchCategory } = require('../controller/search.controller');

const { query } = require('express-validator');

module.exports = function (app) {
    app.get('/api/search/stream', [
        query('query')
            .trim()
            .escape(),
        query('page')
            .trim()
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('limit')
            .trim()
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('tag')
            .trim()
            .escape()
            .isBoolean()
            .withMessage('Query must be a boolean value.')
            .toBoolean(true)
    ], searchStream);

    app.get('/api/search/category', [
        query('query')
            .trim()
            .escape(),
        query('page')
            .trim()
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('limit')
            .trim()
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('tag')
            .trim()
            .escape()
            .isBoolean()
            .withMessage('Query must be a boolean value.')
            .toBoolean(true)
    ], searchCategory);
};
