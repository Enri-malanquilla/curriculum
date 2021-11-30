//requerimientos principales

require('dotenv').config();

const express = require('express');
const fileupload = require('express-fileupload');
const { PORT, HOST } = process.env;

//VARIABLES PARA SERVER
const app = express();
app.use(express.json());
app.use(fileupload());

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
