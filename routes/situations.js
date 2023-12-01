const express = require('express');
const router = express.Router();
const { listSituations, createSituation, readSituation, updateSituation, deleteSituation, _listSituations } = require('../controllers/situationController');

router.get('/situations', listSituations);
router.post('/situation', createSituation);
router.get('/situation/:id', readSituation);
router.post('/situation/:id', updateSituation);
router.delete('/situation/:id', deleteSituation);
router.get('/_situations', _listSituations);
module.exports = router;