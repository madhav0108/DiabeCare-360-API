require('dotenv').config();
const express = require('express');
const connect = require('./db');  // Import your database connection
const app = express();

// redirect HTTP traffic to HTTPS
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});

// Middleware to parse JSON
app.use(express.json());

const helmet = require('helmet');
app.use(helmet());

// const cors = require('cors');
// app.use(cors());

const authenticateToken = require('./middleware/authenticateToken'); // Adjust path as necessary
const userRoutes = require('./routes/userRoutes');
// Apply the authentication middleware to all routes under /api/user
app.use('/api/user', authenticateToken, userRoutes);

// Core functionality routes
const glucoseRoutes = require('./routes/glucoseRoutes');
app.use('/api/glucose', glucoseRoutes);

const medicationRoutes = require('./routes/medicationRoutes');
app.use('/api/medication', medicationRoutes);

const dietaryRoutes = require('./routes/dietaryRoutes');
app.use('/api/dietary', dietaryRoutes);

const activityRoutes = require('./routes/activityRoutes');
app.use('/api/activity', activityRoutes);

// Swagger UI for API documentation
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDef');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// const deviceRoutes = require('./routes/deviceRoutes');
// app.use('/api', deviceRoutes);

// Basic error handling
app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Middleware to log and send error responses
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Process-level error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
