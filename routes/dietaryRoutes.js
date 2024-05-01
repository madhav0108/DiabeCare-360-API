// routes/dietaryRoutes.js
const express = require('express');
const router = express.Router();
const dietaryController = require('../controllers/dietaryController');

router.post('/', dietaryController.createDietary);
router.get('/', dietaryController.getAllDietaryEntries);
router.get('/:id', dietaryController.getDietaryById);
router.put('/:id', dietaryController.updateDietary);
router.delete('/:id', dietaryController.deleteDietary);

module.exports = router;
