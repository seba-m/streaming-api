const { searchStream, searchCategory } = require('../controller/search.controller');

const { query } = require('express-validator');

module.exports = function (app) {
    app.get('/api/search/stream', [
        query('query')
            .not().isEmpty()
            .withMessage('You must provide a word to search.')
            .whitelist('[a-zA-Z0-9]')
            .isLength({ min: 1, max: 40 })
            .withMessage('Query must be between 1 and 40 characters.'),
        query('page')
            .whitelist('[0-9]')
            .toInt(),
        query('limit')
            .whitelist('[0-9]')
            .toInt(),
    ], searchStream);

    app.get('/api/search/category', [
        query('query')
            .not().isEmpty()
            .withMessage('You must provide a word to search.')
            .whitelist('[a-zA-Z0-9]')
            .isLength({ min: 1, max: 40 })
            .withMessage('Query must be between 1 and 40 characters.'),
        query('page')
            .whitelist('[0-9]')
            .toInt(),
        query('limit')
            .whitelist('[0-9]')
            .toInt(),
    ], searchCategory);
};
