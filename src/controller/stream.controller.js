const User = require("../models/User.model");

const { sanitizeText, textRegex } = require("../Utils/Sanitize.util");

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
                return res.status(404).send({ message: err });
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
                        return res.status(404).send({ message: err });
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
                return res.status(404).send({ message: err });
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
                        return res.status(404).send({ message: err });
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
            return res.status(404).send({ message: err });
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
            return res.status(404).send({ message: err });
        }

        if (!user) {
            console.log("User not found", user);
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

exports.topStreamers = function (req, res, next) {
    /*User.aggregate([{ $sample: { size: 10 } }], function (err, users) {
        if (err) {
            return res.status(404).send({ message: err });
        }

        if (!users) {
            return res.status(404).send("Users not found");
        }

        let streamers = [];

        users.forEach((user) => {
            streamers.push({
                username: user.userName,
            });
        });

        return res.status(200).send(JSON.stringify(streamers));
    });*/

    res.send(JSON.stringify(
        
            [
                {
                    username: 'test',
                    avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png",
                    banner: "https://images6.alphacoders.com/805/805656.jpg",
                },
                {
                    username: 'test2',
                    avatar: "https://avatarfiles.alphacoders.com/241/thumb-241437.png",
                    banner: "https://t4.ftcdn.net/jpg/04/76/97/21/360_F_476972142_uRS5wPTyt0ydlExUPxG5F3MftFVNrRXQ.jpg",
                },
                {
                    username: 'test3',
                    avatar: "https://avatarfiles.alphacoders.com/190/thumb-190579.jpg",
                    banner: "https://images3.alphacoders.com/157/thumb-1920-157265.jpg",
                },
                {
                    username: 'test4',
                    avatar: "https://avatarfiles.alphacoders.com/132/thumb-132614.jpg",
                    banner: "https://images.hdqwalls.com/wallpapers/red-dead-redemption-4k-landhscape-84.jpg",
                },
                {
                    username: 'test5',
                    avatar: "https://avatarfiles.alphacoders.com/304/thumb-304282.png",
                    banner: "https://wallpapercave.com/wp/wp9495570.jpg",
                },
            ]
          
      ));
};
