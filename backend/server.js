//requerimientos principales

require('dotenv').config();
const cors = require('cors');

const express = require('express');
const fileupload = require('express-fileupload');
const { PORT, HOST } = process.env;

//VARIABLES PARA SERVER
const app = express();
app.use(express.json());
app.use(fileupload());
app.use(cors());

/*
ENDPOINT USUARIO
*/
const getUsuario = require('./controllers/usuario/getUsuario');

app.get('/usuario', getUsuario);

// ENDPOINT DATOS

const experiencia = require('./controllers/datos/experiencia');
const estudios = require('./controllers/datos/estudios');
const otros = require('./controllers/datos/otros');
const instituciones = require('./controllers/datos/instituciones');

app.get('/experiencia', experiencia);
app.get('/estudios', estudios);
app.get('/otros', otros);
app.get('/instituciones', instituciones);

/*
##############################
#### MIDDLEWARE DE ERRORES####
##############################
*/

//ERROR
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//NOT FOUND

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'NO ENCONTRADO',
  });
});

/*
##############################
#### PUERTO DE ESCUCHA #######
##############################
*/

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${HOST}${PORT}`);
});
