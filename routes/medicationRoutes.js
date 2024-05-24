// routes/medicationRoutes.js
const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const authenticateToken = require('../middleware/authenticationToken');

router.post('/', authenticateToken, medicationController.createMedication);
router.get('/', authenticateToken, medicationController.getAllMedications);
router.get('/:id', authenticateToken, medicationController.getMedicationById);
router.put('/:id', authenticateToken, medicationController.updateMedication);
router.delete('/:id', authenticateToken, medicationController.deleteMedication);

module.exports = router;
