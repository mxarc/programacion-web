const express = require('express');
const routes = express.Router();

const gendersController = require('../controllers/gendersController');

// Rutas

routes.get('/', gendersController.getGenders);

routes.get('/:id', gendersController.getGender);

routes.post('/', gendersController.createGender);

routes.put('/:id', gendersController.editGender);

routes.delete('/:id', gendersController.deleteGender);

module.exports = routes;
