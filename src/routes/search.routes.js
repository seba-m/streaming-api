const { searchStream, searchCategory } = require('../controller/search.controller');

const { query } = require('express-validator');

module.exports = function (app) {
    app.get('/api/search/stream', [
        query('query')
            .not().isEmpty()
            .withMessage('You must provide a word to search.')
            .escape()
            .isLength({ min: 1, max: 60 })
            .withMessage('Query must be between 1 and 60 characters.'),
        query('page')
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('limit')
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('tag')
            .escape()
            .isLength({ max: 60 })
            .withMessage('Query must have max 60 characters.')
    ], searchStream);

    app.get('/api/search/category', [
        query('query')
            .not().isEmpty()
            .withMessage('You must provide a word to search.')
            .escape()
            .isLength({ min: 1, max: 60 })
            .withMessage('Query must be between 1 and 60 characters.'),
        query('page')
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('limit')
            .escape()
            .whitelist('[0-9]')
            .toInt(),
        query('tag')
            .isBoolean()
            .withMessage('Query must be a boolean value.')
            .toBoolean(true)
    ], searchCategory);
};
