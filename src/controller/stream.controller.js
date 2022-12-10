const User = require("../models/User.model");
const Category = require("../models/Category.model")

exports.follow = function (req, res, next) {
    let username = req.body.username;
    let currentUser = req.userId;

    User.findOneAndUpdate(
        { userName: username },
        {
            $inc: {
                followers: 1,
            },
        },
        { new: true },
        (err, user) => {

            if (err) {
                return res.status(500).json({ message: "Server error." });
            }

            if (!user) {
                return res.status(404).send("User not found");
            }

            User.findByIdAndUpdate(
                { _id: currentUser },
                {
                    $push: {
                        following: user.userName,
                    },
                },
                (err, user) => {
                    if (err) {
                        return res.status(500).json({ message: "Server error." });
                    }

                    if (!user) {
                        return res.status(404).send("User not found");
                    }

                    return res.status(200).send("Followed");
                }
            );
        }
    );
};

exports.unfollow = function (req, res, next) {
    let username = req.body.username;
    let currentUser = req.userId;

    User.findOneAndUpdate(
        { userName: username },
        {
            $inc: {
                followers: -1,
            },
        },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(500).send("Server error");
            }

            if (!user) {
                return res.status(404).send("User not found");
            }

            User.findByIdAndUpdate(
                currentUser,
                {
                    $pull: {
                        following: user.userName,
                    },
                },
                (err, user) => {
                    if (err) {
                        return res.status(500).send("Server error");
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

exports.isFollowing = function (req, res, next) {
    let currentUser = req.userId;
    let username = req.body.username;

    User.findById(currentUser, (err, user) => {
        if (err) {
            return res.status(500).send("Server error");
        }

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(JSON.stringify({
            isFollowing: user.following.includes(username),
            username: user.userName,
            streamer: username
        }));
    });
};


exports.viewStreamer = function (req, res, next) {
    let username = req.params.streamName;

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

        return res.status(200).send(JSON.stringify(
            {
                streams: data.docs.map((user) => {
                    return {
                        username: user.userName,
                        avatar: user.avatar,
                        banner: user.banner,
                    }
                }),
                totalPages: data.totalPages,
                currentPage: data.page,
            }
        ));
    });
};