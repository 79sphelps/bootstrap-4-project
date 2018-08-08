const express = require('express');
const router = express.Router();
const ctrlImages = require('../controllers/images.controller');

router.get('/images', ctrlImages.getImages);
router.post('/images', ctrlImages.create);
router.put('/images/:id', ctrlImages.update);
router.delete('/images/:id', ctrlImages.delete);

module.exports = router;
