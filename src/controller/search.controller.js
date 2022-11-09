const User = require("../models/User.model");
const Category = require("../models/Category.model")

function sanitizeText(string) {
    return string.replace(/[^ a-zA-Z0-9]/g, "");
}

function textRegex(name) {
    let username = sanitizeText(name);
    return new RegExp(username);
}

exports.searchStream = function (req, res, next) {

    let streamerRegex = textRegex(req.query.query);

    User.find({ userName: streamerRegex }, function (err, streamers) {
        if (err) {
            res.send(err);
        }

        res.send(JSON.stringify(
            {
                streams: streamers.map((streamer) => {
                    return {
                        username: streamer.userName,
                        followers: streamer.followers,
                        about: streamer.about,
                        category: streamer.streamData.category,
                        title: streamer.streamData.title,
                        views: streamer.streamData.viewers,
                        tags: streamer.streamData.tags,
                        islive: streamer.streamData.isLive,
                    };
                })
            }
        ));
    });

    /*res.send(JSON.stringify(
        {
            streams:
                [
                    {
                        username: 'test',
                        category: 'csgo',
                        title: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
                        views: 0,
                        tags: ['test1', 'vtuber', 'spain'],
                    },
                    {
                        username: 'user123123',
                        category: 'csgo',
                        title: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
                        views: 0,
                        tags: ['test', 'vtuber', 'spain'],
                    },
                    {
                        username: 'test2',
                        followers: 0,
                        about: 'this is a test about description',
                    }
                ]
        }
    ));*/
};

exports.searchCategory = function (req, res, next) {

    let categoryName = textRegex(req.query.query);

    Category.find({ name: categoryName }, function (err, categories) {
        if (err) {
            res.send(err);
        }

        res.send(JSON.stringify(
            {
                categories: categories.map((category) => {
                    return {
                        name: category.name,
                        tags: category.tags,
                        spectators: category.spectators,
                    };
                })
            }
        ));
    });


    //let randomStreamers = db.search(req.query.page);
    /*res.send(JSON.stringify(
        {
            categories:
                [
                    {
                        name: 'minecraft',
                        spectators: 2_000_000,
                        tags: ['adventures games', 'mmo', 'survivor'],
                        image: 'https://static.wikia.nocookie.net/c-s/images/8/88/2127186-box_minecraft_large.png/revision/latest?cb=20121218031643',

                    },
                    {
                        name: 'minecraft dungeons',
                        spectators: 2_000_000,
                        tags: ['action', 'adventures games', 'rpg'],
                        image: 'https://static.wikia.nocookie.net/c-s/images/8/88/2127186-box_minecraft_large.png/revision/latest?cb=20121218031643',
                    },
                    {
                        name: 'Minecraft: Story Mode',
                        spectators: 2_000_000,
                        tags: ['adventures games', 'action'],
                        image: 'https://static.wikia.nocookie.net/c-s/images/8/88/2127186-box_minecraft_large.png/revision/latest?cb=20121218031643',
                    },
                ]
        }
    ));*/
};

exports.search = function (req, res, next) {

    let query = textRegex(req.query.query);

    let results = [];

    User.find({ userName: query }, function (err, streamers) {
        if (err) {
            res.send(err);
        }

        results.push({
            streams: streamers.map((streamer) => {
                return {
                    username: streamer.userName,
                    followers: streamer.followers,
                    about: streamer.about,
                    category: streamer.streamData.category,
                    title: streamer.streamData.title,
                    views: streamer.streamData.viewers,
                    tags: streamer.streamData.tags,
                    islive: streamer.streamData.isLive,
                };
            })
        });
    });

    Category.find({ name: query }, function (err, categories) {
        if (err) {
            res.send(err);
        }

        results.push({
            categories: categories.map((category) => {
                return {
                    name: category.name,
                    tags: category.tags,
                    spectators: category.spectators,
                };
            })
        });
    });

    res.send(JSON.stringify(results));

    //let randomStreamers = db.search(req.query.page);
    /*res.send(JSON.stringify(
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
    ));*/
};