const User = require("../models/User.model");
const { updateImage, getImage, deleteImage } = require("../services/AwsS3.service");
const { sanitizeText } = require("../Utils/Sanitize.util");

exports.updateBanner = function (req, res) {
    if (!req.file) {
        return res.status(403).send({ message: "No image has been uploaded." });
    }
    
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var filename = req.file.filename;
        var imagePath = `uploads/user/banner/${filename}`;
        
        const error = updateImage(req.file.path, imagePath);
        
        if (error) {
            return res.status(500).send({ message: error });
        }

        user.banner = filename;
        user.save((err) => {
            if (err) {
                return res.status(500).send({ message: "Server error." });
            }
            return res.status(200).send({ message: "Banner updated successfully." });
        });
    });
};

exports.updateAvatar = function (req, res) {
    if (!req.file) {
        return res.status(403).send({ message: "No image has been uploaded." });
    }
    
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var filename = req.file.filename;
        var imagePath = `uploads/user/avatar/${filename}`;

        const error = updateImage(req.file.path, imagePath);

        if (error) {
            return res.status(500).send({ message: error });
        }

        user.avatar = filename;
        user.save((err) => {
            if (err) {
                return res.status(500).send({ message: "Server error." });
            }
            return res.status(200).send({ message: "Avatar updated successfully." });
        });
    });
};

exports.deleteBanner = function (req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var imagePath = `uploads/user/banner/${user.banner}`;
        deleteImage(imagePath, res);

        user.banner = null;
        user.save((err) => {
            if (err) {
                return res.status(500).send({ message: "Server error." });
            }
            return res.status(200).send({ message: "Banner deleted successfully." });
        });
    });
}

exports.deleteAvatar = function (req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var imagePath = `uploads/user/avatar/${user.userName}`;
        deleteImage(imagePath, res);

        user.avatar = null;
        user.save((err) => {
            if (err) {
                return res.status(500).send({ message: "Server error." });
            }
            return res.status(200).send({ message: "Avatar deleted successfully." });
        });
    });
}

exports.getBanner = function (req, res) {
    var username = sanitizeText(req.params.userName);
    User.find(username, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var imagePath = `uploads/user/banner/${user.banner}`;
        getImage(imagePath, res);
    });
}

exports.getAvatar = function (req, res) {
    var username = sanitizeText(req.params.userName);
    User.find(username, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var imagePath = `uploads/user/avatar/${user.avatar}`;
        const error = getImage(imagePath, res);

        if (error) {
            return res.status(500).send({ message: error });
        }
    });
}