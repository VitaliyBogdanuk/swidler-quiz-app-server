const express = require('express');
const router = express.Router();
const { listTopics, createTopic, readTopic, updateTopic, deleteTopic } = require('../controllers/topicController');

router.get('/topics', listTopics);
router.post('/topic', createTopic);
router.get('/topic/:id', readTopic);
router.post('/topic/:id', updateTopic);
router.delete('/topic/:id', deleteTopic);

module.exports = router;