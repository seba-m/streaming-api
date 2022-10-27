
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
            islive: true
        }));
    });
};