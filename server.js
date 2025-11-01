// server.js
const dotenv = require('dotenv');
dotenv.config(); // 👈 primero leemos .env

const express = require('express');
const cors = require('cors');
const { connectToServer } = require('./db/conn'); // 👈 ahora sí podemos requerir la conexión

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World from CSE 341!');
});

// rutas de contactos
app.use('/contacts', require('./routes/contacts'));

connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
