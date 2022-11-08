const User = require('../models/User.model');

exports.follow = function (req, res, next) {
    let username = req.body.username;
    let currentUser = req.userId;

    User.findByIdAndUpdate({ userName: username }, 
        {
            $inc: {
                followers: 1
            }
        }, 
        function (err, user) {
            if (err) {
                return res.status(404).send({ message: err });
            }
            
            if (!user) {
                return res.status(404).send("User not found");
            }
        }
    ).select('_id')
    .exec(
        User.findByIdAndUpdate({ _id: currentUser },
            {
                $push: {
                    following: username
                }
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
        )
    );
}

exports.unFollow = function (req, res, next) {
    let username = req.body.username;
    let currentUser = req.userId;

    User.findByIdAndUpdate({ userName: username },
        {
            $inc: {
                followers: -1
            }
        },
        function (err, user) {
            if (err) {
                return res.status(404).send({ message: err });
            }

            if (!user) {
                return res.status(404).send("User not found");
            }
        }
    ).select('_id')
    .exec(
        User.findByIdAndUpdate({ _id: currentUser },
            {
                $pull: {
                    following: username
                }
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
        )
    );
}

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
}

exports.viewStreamer = function (req, res, next) {

    let username = req.body.username;

    User.findOne({ userName: username }, function (err, user) {
        if (err) {
            return res.status(404).send({ message: err });
        }

        if (!user) {
            return res.status(404).send("User not found");
        }

        let streamer = {
            url: `http://localhost:8000/live/${user.key}.flv`,
            username: user.userName,
            about: user.about,
            title: user.title,
            tags: user.tags,
            time: user.time,
            category: user.category,
            followers: user.followers,
            following: user.following,
            islive: user.islive
        }

        return res.status(200).send(JSON.stringify(streamer));
    });

    //TODO: search streamer data using streamer name on database
    /*res.send(JSON.stringify({
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
    }));*/
}

exports.topStreamers = function (req, res, next) {

    //get random 10 streamers from database using sample and size

    User.aggregate([
        { $sample: { size: 10 } }
    ], function (err, users) {
        if (err) {
            return res.status(404).send({ message: err });
        }

        if (!users) {
            return res.status(404).send("Users not found");
        }

        let streamers = [];

        users.forEach(user => {
            streamers.push({
                username: user.userName,
            });
        });

        return res.status(200).send(JSON.stringify(streamers));
    });

    /*res.send(JSON.stringify(
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
    ));*/
}