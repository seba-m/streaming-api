
module.exports = function (app) {
    app.get('/api/stream/view/:streamName', function (req, res, next) {
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
};