

module.exports = function (app) {
    app.get('/api/search/stream', function (req, res, next) {
        //let randomStreamers = db.search(req.query.page);
        res.send(JSON.stringify(
            {
                Streams:
                    [
                        {
                            Username: 'test',
                            Category: 'csgo',
                            Title: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
                            Views: 0,
                            Tags: ['test1', 'vtuber', 'spain'],
                        },
                        {
                            Username: 'test2',
                            Followers: 0,
                            About: 'this is a test about description',
                        },
                        {
                            Username: 'test3',
                            Followers: 0,
                            About: 'this is a test about description',
                        },
                        {
                            Username: 'test4',
                            Followers: 0,
                            About: 'this is a test about description',
                        },
                        {
                            Username: 'test5',
                            Followers: 0,
                            About: 'this is a test about description',
                        },
                    ]
            }
        ));
    });

    app.get('/api/search/tag', function (req, res, next) {
        //let randomStreamers = db.search(req.query.page);
        res.send(JSON.stringify(
            {
                Streams:
                    [
                        {
                            Username: 'test',
                            Category: 'csgo',
                            Title: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
                            Views: 0,
                            Tags: ['test', 'vtuber', 'spain'],
                        }
                    ]
            }
        ));
    });

    app.get('/api/search/', function (req, res, next) {
        //let randomStreamers = db.search(req.query.page);
        res.send(JSON.stringify(
            {
                Streams:
                    [
                        {
                            Username: 'test',
                            Category: 'csgo',
                            Title: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
                            Views: 0,
                            Tags: ['test', 'vtuber', 'spain'],
                        }
                    ]
            }
        ));
    });
};
