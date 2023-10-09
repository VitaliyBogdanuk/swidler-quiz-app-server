# Swidler Quiz App Documentation

## Introduction

Swidler Quiz App is a Node.js application that provides a backend API for quiz functionalities. This documentation provides steps to set up the app locally and details about the API endpoints.

## Prerequisites

- Node.js and npm installed.
- PostgreSQL installed and running.

## Local Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VitaliyBogdanuk/swidler-quiz-app-server.git
   cd swidler-quiz-app-server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup PostgreSQL**:
   - Ensure PostgreSQL is running.
   - Create a new database for the app.
   - Create your `config/config.json` file based on `config/config_template.json`
   - Update the `config/config.json` file with your database credentials.
   - Create your `.env` file based on `.env_template`
   - Update the `.env` file with your settings.

4. **Run Migrations and Seeds**:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

   You can use this command to drop the tables database, be carefull because all your data will be removed.
   ```bash
   npm run db:migrate:drop
   ```

5. **Start the App**:
   ```bash
   npm run start
   ```

6. Open browser and find Swagger API Documentation by URL: `http://localhost:[your-port]/api-docs`

## API Documentation (Swagger)

To generate and view the Swagger documentation for the API:

1. Install `swagger-ui-express` and `swagger-jsdoc`:
   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

2. In your main server file (e.g., `server.js`), set up Swagger:

   ```javascript
   const swaggerUi = require('swagger-ui-express');
   const swaggerJsdoc = require('swagger-jsdoc');

   const options = {
     definition: {
       openapi: '3.0.0',
       info: {
         title: 'Swidler Quiz App API',
         version: '1.0.0',
       },
     },
     apis: ['./routes/*.js'], // Path to your route files
   };

   const specs = swaggerJsdoc(options);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
   ```

3. In your route files, add JSDoc comments to document your API endpoints. For example:

   ```javascript
   /**
    * @swagger
    * /api/situations:
    *   get:
    *     description: Retrieve all situations
    *     responses:
    *       200:
    *         description: List of all situations
    */
   router.get('/situations', ...);
   ```

4. Start your app and navigate to `http://localhost:[your-port]/api-docs` to view the Swagger documentation.