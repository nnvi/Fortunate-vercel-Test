const multer = require('multer')
// const storage = multer.diskStorage({
//     fileName: function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const uploader = multer({storage: storage});
const uploader = multer();

module.exports = uploader;