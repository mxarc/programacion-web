const connection = require('../config/connection');

function getMovies(req, res) {
  if (connection) {
    let sql = 'SELECT * FROM Peliculas';
    connection.query(sql, (err, peliculas) => {
      if (err) {
        res.json(err);
      } else {
        console.log(peliculas);
        res.json(peliculas);
      }
    });
  }
}

function getMovie(req, res) {
  if (connection) {
    const { id } = req.params;
    let sql = `SELECT * FROM Peliculas WHERE id = ?`;
    connection.query(sql, [id], (err, pelicula) => {
      if (err) {
        res.json(err);
      } else {
        let message = '';
        if (pelicula === undefined || pelicula.length === 0)
          message = 'Pelicula no encontrada';
        res.json({ error: false, data: pelicula, message });
      }
    });
  }
}

function createMovie(req, res) {
  if (connection) {
    const movie = req.body;
    if (!movie.titulo && movie.titulo.length > 120) {
      return res.status(400).send({
        error: true,
        message:
          'El titulo de la pelicula es obligatorio || El titulo de la pelicula no debe ser mayor a 120 caracteres',
      });
    }
    if (!movie.director && movie.director.length > 100) {
      return res.status(400).send({
        error: true,
        message:
          'El nombre del director de la pelicula es obligatorio || El nombre del director de la pelicula no debe ser mayor a 100 caracteres',
      });
    }

    if (!movie.fecha && movie.fecha.length != 4) {
      return res.status(400).send({
        error: true,
        message: 'El año de la pelicula es obligatorio || bruh',
      });
    }
    console.log(movie);
    let sql = 'INSERT INTO Peliculas SET ?';
    connection.query(sql, [movie], (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          error: false,
          data: rows,
          message: 'Pelicula añadida con exito',
        });
      }
    });
  }
}

function editMovie(req, res) {
  if (connection) {
    const { id } = req.params;
    const movie = req.body;
    let sql = 'UPDATE Peliculas SET ? WHERE id = ?';
    connection.query(sql, [movie, id], (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        let message = '';
        if (rows.changedRows === 0) message = 'La información es la misma';
        else message = 'Pelicula modificada con exito';

        res.json({ error: false, data: rows, message });
      }
    });
  }
}

function deleteMovie(req, res) {
  if (connection) {
    const { id } = req.params;
    let sql = 'DELETE FROM Peliculas WHERE id= ?';
    connection.query(sql, [id], (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        let message = '';
        if (rows.affectedRows === 0) {
          message = 'Pelicula no encontrada';
        } else {
          message = 'Pelicula eliminada con exito';
        }

        res.json({ error: false, data: rows, message });
      }
    });
  }
}

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  editMovie,
  deleteMovie,
};
