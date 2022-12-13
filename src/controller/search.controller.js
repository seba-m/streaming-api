const User = require("../models/User.model");
const Category = require("../models/Category.model")
const sanitize = require('mongo-sanitize');

const { textRegex, isEmpty } = require("../Utils/Sanitize.util");

exports.searchStream = function (req, res, next) {

    if (isEmpty(req.query?.query)) {
        return res.send(JSON.stringify(
            {
                streams: []
            }
        ));
    }

    let textToSearch = textRegex(sanitize(req.query.query));
    let page = sanitize(req.query.page) || 1; //default page 1
    let limit = sanitize(req.query.limit) || 10; //default result limit 10
    let isTag = sanitize(req.query.tag) || false;

    const query = 
        isTag ? 
            { "streamData.tags": textToSearch } : 
            { userName: textToSearch };

    User.paginate(
        query,
    {
        page: page,
        limit: limit,
    }, 
    function (err, data) {
        if (err) {
            res.status(500).json({ message: "Server error." });
            return;
        }

        res.send(JSON.stringify(
            {
                streams: data.docs.map((streamer) => {
                    return {
                        username: streamer.streamData.name,
                        followers: streamer.followers,
                        about: streamer.about,
                        category: streamer.streamData.category,
                        title: streamer.streamData.title,
                        views: streamer.streamData.viewers,
                        tags: streamer.streamData.tags,
                        islive: streamer.streamData.isLive,
                    };
                }),
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            }
        ));
    });
};

exports.searchCategory = function (req, res, next) {

    if (isEmpty(req.query?.query)) {
        return res.send(JSON.stringify(
            {
                categories: []
            }
        ));
    }

    let textToSearch = textRegex(sanitize(req.query.query));
    let page = sanitize(req.query.page) || 1; //default page 1
    let limit = sanitize(req.query.limit) || 10; //default result limit 10
    let isTag = sanitize(req.query.tag) || false;

    const query =
        isTag ?
            { tags: textToSearch } :
            { name: textToSearch };

    Category.paginate(
        query,
        {
            page: page,
            limit: limit,
        },
        function (err, data) {
            if (err) {
                res.status(500).json({ message: "Server error." });
                return;
            }

        res.send(JSON.stringify(
            {
                categories: data.docs.map((category) => {
                    return {
                        name: category.name,
                        tags: category.tags,
                        spectators: category.spectators,
                        cover: category.cover,
                    };
                }),
                totalPages: data.pages,
                currentPage: data.page,
            }
        ));
    });
};