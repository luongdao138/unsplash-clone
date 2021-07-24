const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image');

router.post('/', imageController.addImage);
router.get('/', imageController.getAllImages);
router.delete('/:id', imageController.deleteImage);

module.exports = router;
