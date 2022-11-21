const User = require("../models/User.model");
const Category = require("../models/Category.model")

const { textRegex, isEmpty, sanitizeNumber } = require("../Utils/Sanitize.util");

exports.searchStream = function (req, res, next) {

    if (isEmpty(req.query?.query) || isEmpty(req.query?.page)) {
        return res.send(JSON.stringify(
            {
                streams: []
            }
        ));
    }

    let query = textRegex(req.query.query);
    let page = sanitizeNumber(req.query.query);

    User.find({
        $or: [
            { userName: query },
            { "streamData.tags": query }
        ]
    }, function (err, streamers) {
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

    if (isEmpty(req.query?.query) || isEmpty(req.query?.page)) {
        return res.send(JSON.stringify(
            {
                categories: []
            }
        ));
    }

    let query = textRegex(req.query.query);
    let page = sanitizeNumber(req.query.query);

    Category.find({
        $or: [
            { name: query },
            { tags: query }
        ]
    }, function (err, categories) {
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