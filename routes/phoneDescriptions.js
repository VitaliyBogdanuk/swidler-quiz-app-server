const express = require('express');
const router = express.Router();
const { updateApprovedDescriptions, deleteDescription, publishCheaterPhone } = require('../controllers/moderationController');


router.delete('/phoneDescription/:id', deleteDescription);
router.post('/phoneDescription/:id', publishCheaterPhone);

module.exports = router;