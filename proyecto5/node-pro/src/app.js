const express = require('express');
const cors = require('cors');

// Inicializar
const app = express();
app.use(cors());

//Configuración
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Base de datos
require('./config/connection');

//Rutas
app.use('/genders', require('./routes/gendersRoute'));
app.use('/movies', require('./routes/moviesRoute'));

//Levantar el servidor
app.listen(app.get('port'), (error) => {
  if (error) {
    console.log('Ha ocurrido un error: ', error);
  } else {
    console.log('Servidor en puerto: ', app.get('port'));
  }
});
