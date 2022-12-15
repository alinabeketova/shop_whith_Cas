const express = require("express");
const router = express.Router();
const { getPlanes, createPlane, getPlane  } = require('../controllers/planes');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './assets/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

router.get('/', getPlanes)

router.get('/:id', getPlane)

router.post('/', upload.single('planeImage'), createPlane)


module.exports = router;