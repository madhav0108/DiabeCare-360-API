// routes/medicationRoutes.js
const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

router.post('/', medicationController.createMedication);
router.get('/', medicationController.getAllMedications);
router.get('/:id', medicationController.getMedicationById);
router.put('/:id', medicationController.updateMedication);
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
