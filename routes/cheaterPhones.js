const express = require('express');
const router = express.Router();
const { listCheaterPhones, createCheaterPhone, readCheaterPhone, updateCheaterPhone, deleteCheaterPhone } = require('../controllers/сheaterPhoneController');

router.get('/cheaterPhones', listCheaterPhones);
router.post('/cheaterPhone', createCheaterPhone);
router.get('/cheaterPhone/:phone', readCheaterPhone);
router.put('/cheaterPhone/:id', updateCheaterPhone);
router.delete('/cheaterPhone/:id', deleteCheaterPhone);

module.exports = router;