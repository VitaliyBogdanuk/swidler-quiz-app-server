const express = require('express');
const router = express.Router();
const { listAchievements, createAchievement, readAchievement, updateAchievement, deleteAchievement } = require('../controllers/achievementController');

router.get('/achievements', listAchievements);
router.post('/achievement', createAchievement);
router.get('/achievement/:id', readAchievement);
router.put('/achievement/:id', updateAchievement);
router.delete('/achievement/:id', deleteAchievement);

module.exports = router;