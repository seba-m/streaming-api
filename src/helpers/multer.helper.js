const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let p = __dirname + '../../../media/uploads';
        fs.mkdirSync(p, {recursive: true});
        cb(null, p);
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})

const filefilter = function (req, file, callback) {
    var ext = path.extname(file.originalname);

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }

    const fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > 3) {
        return callback(new Error('File size must be less than 3 MB'))
    }

    callback(null, true)
};

var upload = multer({
    storage: storage,
    limits: { fileSize: 3_145_728 }, // 3MB
    fileFilter: filefilter,
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    }
});

let createImage = upload.single('photo');

let multerHelper = {
    createImage,
}

module.exports = multerHelper;