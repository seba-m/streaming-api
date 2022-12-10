const User = require("../models/User.model");
const Category = require("../models/Category.model")

const { sanitizeText } = require("../Utils/Sanitize.util");

exports.follow = function (req, res, next) {
    let username = sanitizeText(req.body.username);
    let currentUser = req.userId;

    User.findByIdAndUpdate(
        { userName: username },
        {
            $inc: {
                followers: 1,
            },
        },
        function (err, user) {
            if (err) {
                return res.status(404).json({ message: "Server error." });
            }

            if (!user) {
                return res.status(404).send("User not found");
            }
        }
    )
        .select("_id")
        .exec((err, id) => {
            User.findByIdAndUpdate(
                { _id: currentUser },
                {
                    $push: {
                        following: id,
                    },
                },
                function (err, user) {
                    if (err) {
                        return res.status(404).json({ message: "Server error." });
                    }

                    if (!user) {
                        return res.status(404).send("User not found");
                    }

                    return res.status(200).send("Followed");
                }
            );
        });
};

exports.unfollow = function (req, res, next) {
    let username = sanitizeText(req.body.username);
    let currentUser = req.userId;

    User.findAndUpdate(
        { userName: username },
        {
            $inc: {
                followers: -1,
            },
        },
        function (err, user) {
            if (err) {
                return res.status(404).json({ message: "Server error." });
            }

            if (!user) {
                return res.status(404).send("User not found");
            }
        }
    )
        .select("_id")
        .exec((err, id) => {
            User.findByIdAndUpdate(
                { _id: currentUser },
                {
                    $pull: {
                        following: id,
                    },
                },
                function (err, user) {
                    if (err) {
                        return res.status(404).json({ message: "Server error." });
                    }

                    if (!user) {
                        return res.status(404).send("User not found");
                    }

                    return res.status(200).send("Unfollowed");
                }
            );
        }
        );
};

exports.following = function (req, res, next) {
    //search over database for the user following

    let currentUser = req.userId;

    User.findById({ _id: currentUser }, function (err, user) {
        if (err) {
            return res.status(404).json({ message: "Server error." });
        }

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(JSON.stringify(user.following));
    });
};

exports.viewStreamer = function (req, res, next) {
    let username = sanitizeText(req.params.streamName);

    User.findOne({ userName: username }, function (err, user) {
        if (err) {
            return res.status(404).json({ message: "Server error." });
        }

        if (!user) {
            return res.status(404).send("User not found");
        }

        let streamer = {
            url: `${process.env.streamingUrl}/app/${user.key}.flv`,
            username: user.userName,
            about: user.about,
            title: user.streamData.title,
            tags: user.streamData.tags,
            time: user.streamData.streamStartTime,
            category: user.streamData._category,
            followers: user.followers,
            //following: user.following,
            islive: user.streamData.isLive,
        };
        
        return res.status(200).send(JSON.stringify(streamer));
    });

    /*res.send(JSON.stringify({
          url: `${process.env.streamingUrl}/live/${req.params.streamName}.flv`,
          username: 'test',
          about: 'this is a test about description',
          title: 'test stream xd',
          tags: ['test1', 'vtuber', 'spain'],
          time: "2022-10-04T19:55:53.790Z",
          category: 'csgo',
          followers: 0,
          views: 0,
          islive: false
      }));*/
};

exports.topCategories = function (req, res, next) {
    Category.aggregate([{ $sample: { size: 10 } }], function (err, data) {
        if (err) {
            return res.status(404).json({ message: "Server error." });
        }

        if (!data) {
            return res.status(404).send("Categories not found");
        }

        let categories = [];

        data.forEach((category) => {
            categories.push({
                name: category.name,
                cover: category.cover
            });
        });

        return res.status(200).send(JSON.stringify(categories));
    });     
};

exports.topStreamers = function (req, res, next) {
    let page = req.query.page || 1; //default page 1
    let limit = req.query.limit || 10; //default result limit 10

    var aggregate = User.aggregate();

    User.aggregatePaginate(aggregate, { page: page, limit: limit, sort: { "streamData.isLive": -1 } }, function (
        err,
        data
    ) {
        if (err) {
            return res.status(404).json({ message: "Server error." });
        }

        if (!data) {
            return res.status(404).send("Users not found");
        }

        let streamers = [];

        data.docs.forEach((user) => {
            streamers.push({
                username: user.userName,
                avatar: user.avatar,
                banner: user.banner,
            });
        });
        
        return res.status(200).send(JSON.stringify(streamers));
    });
};