const express = require('express');
const connect = require('./db');  // Import your database connection
const app = express();

const helmet = require('helmet');
app.use(helmet());

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDef');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// const deviceRoutes = require('./routes/deviceRoutes');
// app.use('/api', deviceRoutes);

connect().then(client => {
    const collection = client.db("test").collection("devices");

    app.get('/', async (req, res, next) => {
        try {
            const documents = await collection.find({}).toArray();
            res.send(documents);
        } catch (err) {
            next(err);  // Forward error to the error handling middleware
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Middleware for error logging
app.use((err, req, res, next) => {
    console.error(err.stack);
    next(err);  // Passes error to the next middleware
});

// Middleware to send error responses
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
});

// Process-level error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
