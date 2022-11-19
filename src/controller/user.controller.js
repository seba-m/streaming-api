
const User = require('../models/User.model');

exports.profile = (req, res, next) => {
    User.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send(user);
    });
};

exports.stream = (req, res, next) => {
    User.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send(user.streamData);
    });
};

exports.updateProfile = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        user.userName = req.body.userName;
        user.email = req.body.email;
        user.birthDate = req.body.birthDate;
        user.updated_at = Date.now();
        user.save((err) => {
            if (err) {
                return res.status(500).send({ message: "Server error." });
            }
            res.status(200).send({ message: "User was updated successfully." });
        });
    });
}

exports.updateStream = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        user.streamData.name = req.body.name;
        user.streamData.description = req.body.description;
        user.streamData.category = req.body.category;
        user.streamData.updated_at = Date.now();
        user.save((err) => {
            if (err) {
                res.status(500).send({ message: "Server error." });
                return;
            }
            res.status(200).send({ message: "User stream was updated successfully." });
        });
    });
}

exports.deleteAccount = (req, res, next) => {
    User.findByIdAndRemove(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send({ message: "User was deleted successfully!" });
    });
}