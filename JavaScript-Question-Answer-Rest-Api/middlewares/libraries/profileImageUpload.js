const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");


//Storage, FileFilter

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rooDir = path.dirname(require.main.filename);
        cb(null, path.join(rooDir, "/public/uploads"));
    },
    filename: function (req, file, cb) {
        //File - MineType - image/png

        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "image_" + req.user.id + "." + extension;
        cb(null, req.savedProfileImage);
    }
});

const fileFilter = (req, file, cb) => {
    let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a vaild image file", 400), false);
    }
    return cb(null, true)

};

const profileImageUpload = multer({storage,fileFilter});
module.exports = profileImageUpload;
