const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'servicedb',
  password: 'password',
  port: 5432,
})

// display all products
const getProducts = (request, response) => {
  console.log('test');
  pool.query("SELECT * FROM products", (error, results) => {
    if (error) {
      console.log(error);
    }
    response.status(200).json(results.rows);
  })
}

module.exports = {
  getProducts
}