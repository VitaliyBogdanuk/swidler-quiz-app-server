const express = require('express');
const router = express.Router();
const { listCheaterPhones, createCheaterPhoneAdmin, createCheaterPhoneUser, readCheaterPhone, updateCheaterPhone, deleteCheaterPhone } = require('../controllers/cheaterPhoneController');

router.get('/cheaterPhones', listCheaterPhones);
router.post('/cheaterPhone', createCheaterPhoneUser);
router.post('/cheaterPhoneAdmin', createCheaterPhoneAdmin);
router.get('/cheaterPhone/:phone', readCheaterPhone);
router.post('/cheaterPhoneAdmin/:id', updateCheaterPhone);
router.delete('/cheaterPhone/:id', deleteCheaterPhone);

module.exports = router;