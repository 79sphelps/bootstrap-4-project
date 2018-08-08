const express = require('express');
const router = express.Router();
const ctrlPersonel = require('../controllers/personel.controller');

router.get('/personel', ctrlPersonel.getPersonel);
router.post('/personel', ctrlPersonel.create);
router.put('/personel/:id', ctrlPersonel.update);
router.delete('/personel/:id', ctrlPersonel.delete);

module.exports = router;
