const swaggerJSDoc = require("swagger-jsdoc");
// require("..")
// Swagger definition
const swaggerDefinition = {
  info: {
    title: "Food Delivery API",
    version: "1.0.0",
    description: "API documentation for the Food Delivery app",
  },
  servers: [
    { url: "http://localhost:5000", description: "Development Server" },
  ],
};

// Options for the swagger-jsdoc plugin
const options = {
  swaggerDefinition,
  apis: ["../Route/*.js"],
  // Path to the API route files
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
