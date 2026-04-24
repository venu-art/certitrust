const express = require('express');
const multer = require('multer');
const { uploadCertificate } = require('../controllers/uploadController');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // relative to root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route: POST /upload
router.post('/upload', upload.single('certificate'), uploadCertificate);

module.exports = router;
