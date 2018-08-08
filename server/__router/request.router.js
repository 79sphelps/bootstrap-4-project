const express = require('express');
const router = express.Router();
const ctrlRequest = require('../controllers/request.controller');

router.get('/requests', ctrlRequest.getRequests);
router.post('/requests', ctrlRequest.create);
router.put('/requests/:id', ctrlRequest.update);
router.delete('/requests/:id', ctrlRequest.delete);

module.exports = router;
