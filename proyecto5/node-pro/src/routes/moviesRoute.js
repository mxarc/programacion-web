const express = require('express');
const routes = express.Router();

const moviesController = require('../controllers/moviesController');

// Rutas

routes.get('/', moviesController.getMovies);

routes.get('/:id', moviesController.getMovie);

routes.post('/', moviesController.createMovie);

routes.put('/:id', moviesController.editMovie);

routes.delete('/:id', moviesController.deleteMovie);

module.exports = routes;
