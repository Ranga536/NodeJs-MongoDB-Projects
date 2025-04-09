const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const uploadMiddleware = require('../middlewares/upload-middleware');
const {uploadImageController, fetchImagesController, deleteImageController} = require('../controllers/image-controller');

//upload image
router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImageController);

//fetch images
router.get('/fetch', authMiddleware, fetchImagesController);

//delete image
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;