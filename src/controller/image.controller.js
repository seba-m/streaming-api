const User = require("../models/User.model");
const { uploadImage, getImage, deleteImage } = require("../services/AwsS3.service");
const { sanitizeText, isEmpty } = require("../Utils/Sanitize.util");

const fs = require('fs');

function deleteFile(filePath) {
	fs.unlink(filePath, err => console.log(err));
}

exports.updateBanner = function (req, res) {
    if (!req.file) {
        return res.status(403).json({ message: "No image has been uploaded." });
    }
    
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }

        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }

        var filename = !isEmpty(user.banner) ? user.banner : req.file.filename;
        var imagePath = `uploads/user/banner/${filename}`;
        
        const error = uploadImage(req.file.path, imagePath);

        deleteFile(req.file.path);
        
        if (error) {
            return res.status(500).json({ message: "Server error." });
        }

        user.banner = filename;
        user.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Server error." });
            }
            return res.status(200).json({ message: "Banner updated successfully." });
        });
    });
};

exports.updateAvatar = function (req, res) {
    if (!req.file) {
        return res.status(403).json({ message: "No image has been uploaded." });
    }
    
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }

        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }

        var filename = !isEmpty(user.avatar) ? user.avatar : req.file.filename;
        var imagePath = `uploads/user/avatar/${filename}`;

        const error = uploadImage(req.file.path, imagePath);

        deleteFile(req.file.path);

        if (error) {
            return res.status(500).json({ message: error });
        }

        user.avatar = filename;
        user.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Server error." });
            }
            return res.status(200).json({ message: "Avatar updated successfully." });
        });
    });
};

exports.deleteBanner = function (req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }

        var imagePath = `uploads/user/banner/${user.banner}`;
        const error = deleteImage(imagePath);

        if (error) {
            return res.status(500).json({ message: error });
        }

        user.banner = null;
        user.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Server error." });
            }
            return res.status(200).json({ message: "Banner deleted successfully." });
        });
    });
}

exports.deleteAvatar = function (req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }
        var imagePath = `uploads/user/avatar/${user.userName}`;
        const error = deleteImage(imagePath);

        if (error) {
            return res.status(500).json({ message: error });
        }

        user.avatar = null;
        user.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Server error." });
            }
            return res.status(200).json({ message: "Avatar deleted successfully." });
        });
    });
}

exports.getBanner = function (req, res) {
    
    if (isEmpty(req.params.userName)){
        return res.status(404).json({ message: "Invalid User Name." });
    }

    var username = sanitizeText(req.params.userName);
    User.findOne({ userName: username }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }
        
        if (!user.banner){
            return res.status(404).json({ message: "User don't have banner." });
        }

        var imagePath = `uploads/user/banner/${user.banner}`;
        getImage(imagePath, res);
    });
}

exports.getAvatar = function (req, res) {

    if (isEmpty(req.params.userName)){
        return res.status(404).json({ message: "Invalid User Name." });
    }

    var username = sanitizeText(req.params.userName);
    User.findOne({ userName: username }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }

        if (!user.avatar){
            return res.status(404).json({ message: "User don't have avatar." });
        }

        var imagePath = `uploads/user/avatar/${user.avatar}`;
        getImage(imagePath, res);
    });
}