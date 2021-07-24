const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image');
const uploadMiddleware = require('../middlewares/upload');

router.post('/', uploadMiddleware('single', 'image'), imageController.addImage);
router.get('/', imageController.getAllImages);
router.delete('/:id', imageController.deleteImage);

module.exports = router;
