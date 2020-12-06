const connection = require('../config/connection');

function getGenders(req, res) {
  if (connection) {
    let sql = 'SELECT * FROM Generos';
    connection.query(sql, (err, genres) => {
      if (err) {
        res.json(err);
      } else {
        console.log(genres);
        res.json(genres);
      }
    });
  }
}

function getGender(req, res) {
  if (connection) {
    const { id } = req.params;
    let sql = `SELECT * FROM Generos WHERE ID = ?`;
    connection.query(sql, [id], (err, genre) => {
      if (err) {
        res.json(err);
      } else {
        let message = '';
        if (genre === undefined || genre.length === 0)
          message = 'genero no encontrado';
        res.json({ error: false, data: genre, message });
      }
    });
  }
}

function createGender(req, res) {
  if (connection) {
    const genre = req.body;

    if (!genre.genero && genre.genero.length > 50) {
      console.log('gen');
      return res.status(400).send({
        error: true,
        mensaje:
          'El nombre del genero es obligatorio ||El nombre del genero no debe ser mayor a 50 caracteres',
      });
    }
    let sql = 'INSERT INTO Generos set ?';
    connection.query(sql, [genre], (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          error: false,
          data: rows,
          mensaje: 'Genero añadido con exito',
        });
      }
    });
  }
}

function editGender(req, res) {
  if (connection) {
    const { id } = req.params;
    const genre = req.body;
    let sql = 'UPDATE Generos SET ? WHERE id = ?';
    connection.query(sql, [genre, id], (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        let message = '';
        if (rows.changedRows === 0) message = 'La información es la misma';
        else message = 'Genero modificado con exito';

        res.json({ error: false, data: rows, message });
      }
    });
  }
}

function deleteGender(req, res) {
  if (connection) {
    const { id } = req.params;
    let sql = 'DELETE FROM Generos WHERE id = ?';
    connection.query(sql, [id], (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        let message = '';
        if (rows.affectedRows === 0) {
          message = 'Genero no encontrado';
        } else {
          message = 'Genero eliminado con exito';
        }

        res.json({ error: false, data: rows, message });
      }
    });
  }
}

module.exports = {
  getGenders,
  getGender,
  createGender,
  editGender,
  deleteGender,
};
