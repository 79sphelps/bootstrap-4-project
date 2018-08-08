const express = require('express');
const router = express.Router();
const ctrlHomepage = require('../controllers/homepage.controller');

router.get('/homepage', ctrlHomepage.getHomepage);
router.post('/homepage', ctrlHomepage.create);
router.put('/homepage/:id', ctrlHomepage.update);
router.delete('/homepage/:id', ctrlHomepage.delete);

module.exports = router;
