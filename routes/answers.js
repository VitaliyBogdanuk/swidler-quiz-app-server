const express = require('express');
const router = express.Router();
const { listAnswers, createAnswer, readAnswer, updateAnswer, deleteAnswer } = require('../controllers/answerController');

router.get('/answers', listAnswers);
router.post('/answer', createAnswer);
router.get('/answer/:id', readAnswer);
router.put('/answer/:id', updateAnswer);
router.delete('/answer/:id', deleteAnswer);

module.exports = router;