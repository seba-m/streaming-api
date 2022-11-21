const User = require("../models/User.model");
const { updateImage, getImage, deleteImage } = require("../services/AwsS3.service");

exports.updateBanner = function (req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var filename = uuidv4();
        var imagePath = `uploads/user/banner/${filename}.jpg`;
        updateImage(req.file.path, imagePath, res);

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

    console.log("files ["+JSON.stringify(req.file)+"]")
    if (!req.file) {
        return res.status(502).send({ message: "Server error." });
    }

    return res.status(200).send({ message: "Banner updated successfully." }); 

    /*User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var filename = uuidv4();
        var imagePath = `uploads/user/avatar/${filename}.jpg`;
        updateImage(req.file.path, imagePath, res);

        user.avatar = filename;
        user.save((err) => {
            if (err) {
                return res.status(500).send({ message: "Server error." });
            }
            return res.status(200).send({ message: "Banner updated successfully." });
        });
    });*/
};

exports.deleteBanner = function (req, res, next) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var imagePath = `uploads/user/banner/${user.banner}.jpg`;
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

exports.deleteAvatar = function (req, res, next) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var imagePath = `uploads/user/avatar/${user.userName}.jpg`;
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

exports.getBanner = function (req, res, next) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var imagePath = `uploads/user/banner/${user.banner}.jpg`;
        getImage(imagePath, res);
    });
}

exports.getAvatar = function (req, res, next) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var imagePath = `uploads/user/avatar/${user.avatar}.jpg`;
        getImage(imagePath, res);
    });
}