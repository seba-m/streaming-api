

module.exports = function (app) {
    app.get('/api/search/stream', function (req, res, next) {
        //let randomStreamers = db.search(req.query.page);
        res.send(JSON.stringify(
            {
                streams:
                    [
                        {
                            username: 'test',
                            category: 'csgo',
                            title: 'jugando al csgo',
                            views: 0,
                            tags: ['test1', 'vtuber', 'spain'],
                        },
                        {
                            username: 'test2',
                            followers: 0,
                            about: 'this is a test about description',
                        },
                        {
                            username: 'test3',
                            followers: 0,
                            about: 'this is a test about description',
                        },
                        {
                            username: 'test4',
                            followers: 0,
                            about: 'this is a test about description',
                        },
                        {
                            username: 'test5',
                            followers: 0,
                            about: 'this is a test about description',
                        },
                    ]
            }
        ));
    });

    app.get('/api/search/tag', function (req, res, next) {
        //let randomStreamers = db.search(req.query.page);
        res.send(JSON.stringify(
            {
                streams:
                    [
                        {
                            username: 'test',
                            category: 'csgo',
                            title: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
                            views: 0,
                            tags: ['test', 'vtuber', 'spain'],
                        }
                    ]
            }
        ));
    });

    app.get('/api/search/', function (req, res, next) {
        //let randomStreamers = db.search(req.query.page);
        res.send(JSON.stringify(
            {
                streams:
                    [
                        {
                            username: 'test',
                            category: 'csgo',
                            title: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
                            views: 0,
                            tags: ['test', 'vtuber', 'spain'],
                        }
                    ]
            }
        ));
    });
};
