const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', 
    info: {
      title: 'Recipe APP API',
      version: '1.0.0', 
      description: 'API for managing recipes',
    },
    servers: [
      {
        url: 'http://localhost:3001', 
        description: 'Development server', 
      },
      
    ],
  },
  apis:["./Routes/auth.js", "./Routes/RecipeRoutes.js", "./Routes/reciperoute_api.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
