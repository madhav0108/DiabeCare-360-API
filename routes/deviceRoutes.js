const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Returns a list of devices
 *     description: Retrieve a list of devices from the database.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The device ID.
 *                   name:
 *                     type: string
 *                     description: The name of the device.
 */

// Example route
router.get('/devices', (req, res) => {
    res.send('Responding with some devices');
});

module.exports = router;
