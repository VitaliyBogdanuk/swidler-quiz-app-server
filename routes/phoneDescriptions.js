const express = require('express');
const router = express.Router();
const { deletePhoneDescription } = require('../controllers/phoneDescriptionController');

router.get('/cheaterPhones', listCheaterPhones);
router.delete('/phoneDescription/:id', deletePhoneDescription);

module.exports = router;