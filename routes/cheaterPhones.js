const express = require('express');
const router = express.Router();
const { listCheaterPhones, createCheaterPhoneAdmin, createCheaterPhoneUser, readCheaterPhone, updateCheaterPhone, deleteCheaterPhone } = require('../controllers/cheaterPhoneController');
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.get('/cheaterPhones', listCheaterPhones);
router.post('/cheaterPhone', upload.fields([{ name: 'uploadedFile' }]), createCheaterPhoneAdmin);
router.get('/cheaterPhone/:phone', readCheaterPhone);
router.post('/cheaterPhone/:id', updateCheaterPhone);
router.delete('/cheaterPhone/:id', deleteCheaterPhone);

module.exports = router;