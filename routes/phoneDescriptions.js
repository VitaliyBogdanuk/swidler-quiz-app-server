const express = require('express');
const router = express.Router();
const { updateApprovedDescription, deleteDescription } = require('../controllers/moderationController');

router.get('/phoneDescription/:id', updateApprovedDescription);
router.delete('/phoneDescription/:id', deleteDescription);

module.exports = router;