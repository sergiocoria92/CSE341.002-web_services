// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API RESTful de contactos (W02) con endpoints GET, POST, PUT y DELETE.'
    },
    servers: [
      { url: 'http://localhost:8080' }, // cambia a 3000 si usas 3000
      { url: 'https://cse341-002-web-services-m6u1.onrender.com' } // tu Render real
    ]
  },
  // Mantén las anotaciones en este mismo archivo; si luego agregas más, expande el glob
  apis: ['./swagger.js']
};

/**
 * @openapi
 * tags:
 *   - name: Contacts
 *     description: Endpoints para gestionar contactos
 */

/**
 * @openapi
 * /contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *   post:
 *     tags: [Contacts]
 *     summary: Create a contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *           examples:
 *             basic:
 *               value:
 *                 firstName: Ana
 *                 lastName: Lopez
 *                 email: ana@example.com
 *                 favoriteColor: blue
 *                 birthday: '1992-05-12'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del documento creado
 *
 * /contacts/{id}:
 *   get:
 *     tags: [Contacts]
 *     summary: Get contact by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Not Found
 *   put:
 *     tags: [Contacts]
 *     summary: Replace a contact (all fields required)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       204:
 *         description: No Content
 *   delete:
 *     tags: [Contacts]
 *     summary: Delete contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: MongoDB ObjectId
 *     responses:
 *       204:
 *         description: No Content
 *
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *           example: "66f1b6f3b8f4a2c5d2a9c001"
 *         firstName:
 *           type: string
 *           example: "Ana"
 *         lastName:
 *           type: string
 *           example: "Lopez"
 *         email:
 *           type: string
 *           format: email
 *           example: "ana@example.com"
 *         favoriteColor:
 *           type: string
 *           example: "blue"
 *         birthday:
 *           type: string
 *           example: "1992-05-12"
 *     ContactInput:
 *       type: object
 *       required: [firstName, lastName, email, favoriteColor, birthday]
 *       properties:
 *         firstName: { type: string }
 *         lastName: { type: string }
 *         email: { type: string, format: email }
 *         favoriteColor: { type: string }
 *         birthday: { type: string, example: "1992-05-12" }
 */

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
