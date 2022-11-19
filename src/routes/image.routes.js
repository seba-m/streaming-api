var multer = require("multer");

const { updateBanner, updateAvatar, deleteBanner, deleteAvatar, getBanner, getAvatar } = require('../controller/image.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');

const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    limits: { fileSize: 1_048_576 }, // 1MB
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }

        const fileSize = file.size / 1024 / 1024; // in MB
        if (fileSize > 1) {
            return callback(new Error('File size must be less than 1 MB'))
        }

        callback(null, true)
    }
});

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/user/profile/banner', verifyToken, upload.single('myImage'), updateBanner);

    app.post('/api/user/profile/image', verifyToken, upload.single('myImage'), updateAvatar);

    app.delete('/api/user/profile/banner', verifyToken, deleteBanner);

    app.delete('/api/user/profile/image', verifyToken, deleteAvatar);

    app.get('/api/user/banner/:userName', getBanner);

    app.get('/api/user/image/:userName', getAvatar);
};