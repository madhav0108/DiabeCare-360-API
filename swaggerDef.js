const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',  // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'DiabeCare 360 API',  // Title (required)
      version: '1.0.0',  // Version (required)
      description: 'A simple Express API to manage diabetes care',  // Description (optional)
    },
  },
  apis: ['./routes/deviceRoutes.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
