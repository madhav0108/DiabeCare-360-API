// routes/glucoseRoutes.js
const express = require('express');
const router = express.Router();
const glucoseController = require('../controllers/glucoseController');
const authenticateToken = require('../middleware/authenticationToken');

router.post('/', authenticateToken, glucoseController.createGlucose);
router.get('/', authenticateToken, glucoseController.getAllGlucose);
router.get('/:id', authenticateToken, glucoseController.getGlucoseById);
router.put('/:id', authenticateToken, glucoseController.updateGlucose);
router.delete('/:id', authenticateToken, glucoseController.deleteGlucose);

module.exports = router;
