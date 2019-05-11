const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'project10',
  password: 'project18_db',
  database: 'project18_db',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function injectData() {
  const create_houses_Table = `
   CREATE TABLE IF NOT EXISTS houses(
     id INT AUTO_INCREMENT PRIMARY KEY,
     link VARCHAR(255) NOT NULL UNIQUE,
     location_country VARCHAR(50) NOT NULL,
     location_city VARCHAR(50) NOT NULL,
     size_rooms INT NOT NULL,
     price_value FLOAT NOT NULL,
     price_currency VARCHAR(255) NOT NULL
   )
  `;

  try {
    await execQuery(create_houses_Table);
  } catch (error) {
    console.log(error, `db.js`);
  }
}
injectData();

module.exports = {
  execQuery,
  connection,
  mysql,
};
