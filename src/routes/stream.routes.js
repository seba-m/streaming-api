
module.exports = function (app) {
    app.get('/api/stream/view/:streamName', function (req, res, next) {
        console.log("streamName: " + req.params.streamName);
        //TODO: search streamer data using streamer name on database
        res.send(JSON.stringify({
            URL: `http://localhost:8000/live/${req.params.streamName}.flv`,
            Username: 'test',
            About: 'this is a test about description',
            Title: 'test stream xd',
            Tags: ['test1', 'vtuber', 'spain'],
            Time: "2022-10-04T19:55:53.790Z",
            Category: 'csgo',
            Followers: 0,
            Views: 0,
            IsLive: false
        }));
    });

    app.get('/api/stream/top', function (req, res, next) {
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

    app.get('/api/stream/following', function (req, res, next) {

    });
};
