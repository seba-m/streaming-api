const { searchStream, searchCategory } = require('../controller/search.controller');

module.exports = function (app) {
    app.get('/api/search/stream', searchStream);

    app.get('/api/search/category', searchCategory);
};
