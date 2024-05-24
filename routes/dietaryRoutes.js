// routes/dietaryRoutes.js
const express = require('express');
const router = express.Router();
const dietaryController = require('../controllers/dietaryController');
const authenticateToken = require('../middleware/authenticationToken');

router.post('/', authenticateToken, dietaryController.createDietary);
router.get('/', authenticateToken, dietaryController.getAllDietaryEntries);
router.get('/:id', authenticateToken, dietaryController.getDietaryById);
router.put('/:id', authenticateToken, dietaryController.updateDietary);
router.delete('/:id', authenticateToken, dietaryController.deleteDietary);

module.exports = router;
