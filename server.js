// server.js (versión final en ES Modules)
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import { connectToServer } from './db/conn.js'; // asegúrate de que el archivo se llame conn.js

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // usa 8080 para que coincida con tu requests.rest

app.use(cors());
app.use(express.json());

// Health/test
app.get('/', (_, res) => res.send('Contacts API W02'));

// Rutas
app.use('/contacts', contactsRouter);

// Swagger UI en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conectar a Mongo y arrancar
connectToServer((err) => {
  if (err) {
    console.error('Mongo connection error:', err);
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
