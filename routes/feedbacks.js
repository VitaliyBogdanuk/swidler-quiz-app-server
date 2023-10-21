const express = require('express');
const router = express.Router();
const { listFeedbacks, createFeedback, deleteFeedback } = require('../controllers/feedbackController');

router.get('/feedbacks', listFeedbacks);
router.post('/feedback', createFeedback);
router.delete('/feedback/:id', deleteFeedback);

module.exports = router;