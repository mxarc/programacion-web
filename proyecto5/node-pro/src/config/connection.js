const mysql = require('mysql');

const objetConnection = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'docker',
  database: 'Movies',
};

const myConn = mysql.createConnection(objetConnection);

myConn.connect((err) => {
  if (err) {
    console.log('Ha ocurrido un error', err);
  } else {
    console.log('Base de datos conectada');
  }
});

module.exports = myConn;
