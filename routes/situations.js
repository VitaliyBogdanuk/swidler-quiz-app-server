const express = require('express');
const router = express.Router();
const { listSituations, createSituation, readSituation, updateSituation, deleteSituation } = require('../controllers/situationController');

router.get('/situations', listSituations);
router.post('/situation', createSituation);
router.get('/situation/:id', readSituation);
router.put('/situation/:id', updateSituation);
router.delete('/situation/:id', deleteSituation);

module.exports = router;