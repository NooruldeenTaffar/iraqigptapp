const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', propertyController.list);
router.post('/', authenticate, upload.array('images'), propertyController.create);
router.get('/:id', propertyController.getById);

module.exports = router;
