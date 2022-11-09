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
};

exports.search = function (req, res, next) {

    let query = textRegex(req.query.query);

    let results = [];

    User.find({
        $or: [
            { userName: query },
            { tags: query }
        ]
    }, function (err, streamers) {
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

    Category.find({
        $or: [
            { name: query },
            { tags: query }
        ]
    }, function (err, categories) {
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
};