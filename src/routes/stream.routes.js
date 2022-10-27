
module.exports = function (app) {
    app.get('/api/stream/view/:streamName', function (req, res, next) {
        //TODO: search streamer data using streamer name on database
        res.send(JSON.stringify({
            url: `http://localhost:8000/live/${req.params.streamName}.flv`,
            username: 'test',
            about: 'this is a test about description',
            title: 'test stream xd',
            tags: ['test1', 'vtuber', 'spain'],
            time: "2022-10-04T19:55:53.790Z",
            category: 'csgo',
            followers: 0,
            views: 0,
            islive: false
        }));
    });

    app.get('/api/stream/top', function (req, res, next) {
        res.send(JSON.stringify(
            {
                streamers:
                    [
                        {
                            username: 'test',
                            avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                            banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                        },
                        {
                            username: 'test2',
                            avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                            banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                        },
                        {
                            username: 'test3',
                            avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                            banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                        },
                        {
                            username: 'test4',
                            avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                            banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                        },
                        {
                            username: 'test5',
                            avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                            banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                        },
                    ]
            }
        ));
    });

    app.get('/api/stream/following', function (req, res, next) {

    });
};
