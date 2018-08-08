const express = require('express');
const router = express.Router();
const ctrlEvents = require('../controllers/events.controller');

router.get('/events', ctrlEvents.getEvents);
router.post('/events', ctrlEvents.create);
router.put('/events/:id', ctrlEvents.update);
router.delete('/events/:id', ctrlEvents.delete);

module.exports = router;
