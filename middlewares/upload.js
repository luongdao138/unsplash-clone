const multer = require('multer');

const ALLOW_FORMATS = ['image/jpg', 'image/png', 'image/jpeg'];

module.exports = (type, fieldName) => {
  const storage = multer.memoryStorage();
  const fileFilter = (req, file, cb) => {
    if (ALLOW_FORMATS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not support!'));
    }
  };

  const upload = multer({
    storage,
    fileFilter,
  });

  const uploadCtrl = (req, res, next) => {
    const uploadMiddleware =
      type === 'single' ? upload.single(fieldName) : upload.array(fieldName);

    uploadMiddleware(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // multer error
        return res.status(500).json('Cannot upload file');
      } else if (error) {
        // unknown error
        return res.status(500).json('Cannot upload file');
      }

      // everything is fine
      next();
    });
  };

  return uploadCtrl;
};
