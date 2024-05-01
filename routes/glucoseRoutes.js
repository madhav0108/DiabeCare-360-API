// routes/glucoseRoutes.js
const express = require('express');
const router = express.Router();
const glucoseController = require('../controllers/glucoseController');

router.post('/', glucoseController.createGlucose);
router.get('/', glucoseController.getAllGlucose);
router.get('/:id', glucoseController.getGlucoseById);
router.put('/:id', glucoseController.updateGlucose);
router.delete('/:id', glucoseController.deleteGlucose);

module.exports = router;
