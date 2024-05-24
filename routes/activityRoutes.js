// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authenticateToken = require('../middleware/authenticationToken');

router.post('/', authenticateToken, activityController.createActivity);
router.get('/', authenticateToken, activityController.getAllActivities);
router.get('/:id', authenticateToken, activityController.getActivityById);
router.put('/:id', authenticateToken, activityController.updateActivity);
router.delete('/:id', authenticateToken, activityController.deleteActivity);

module.exports = router;
