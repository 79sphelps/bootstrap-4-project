const express = require('express');
const router = express.Router();
const ctrlTestimonials = require('../controllers/testimonials.controller');

router.get('/testimonials', ctrlTestimonials.getRequests);
router.post('/testimonials', ctrlTestimonials.create);
router.put('/testimonials/:id', ctrlTestimonials.update);
router.delete('/testimonials/:id', ctrlTestimonials.delete);

module.exports = router;
