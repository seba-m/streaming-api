const multerhelper = require("../helpers/multer.helper");  

const { updateBanner, updateAvatar, deleteBanner, deleteAvatar, getBanner, getAvatar } = require('../controller/image.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/user/profile/avatar', verifyToken, multerhelper.createImage, updateAvatar);
    
    app.post('/api/user/profile/banner', verifyToken, multerhelper.createImage, updateBanner);

    app.delete('/api/user/profile/avatar', verifyToken, deleteAvatar);
    
    app.delete('/api/user/profile/banner', verifyToken, deleteBanner);
    
    app.get('/api/user/avatar/:userName', getAvatar);
    
    app.get('/api/user/banner/:userName', getBanner);
};