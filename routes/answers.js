const express = require('express');
const router = express.Router();
const { listAnswers, createAnswer, readAnswer, updateAnswer, deleteAnswer, _listAnswers, _getSituationToAnswer } = require('../controllers/answerController');

router.get('/answers', listAnswers);
router.post('/answer', createAnswer);
router.get('/answer/:id', readAnswer);
router.put('/answer/:id', updateAnswer);
router.delete('/answer/:id', deleteAnswer);
router.get('/_answers', _listAnswers);
router.get('/_situationToAnswer', _getSituationToAnswer);
module.exports = router;