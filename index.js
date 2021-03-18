const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// start psql
// sudo -u postgres psql

// use psql as 'postgres' user
// sudo -u postgres -i

// use psql as 'adrian' user
// sudo -u postgres psql

// add user role
// https://launchschool.com/blog/how-to-install-postgres-for-linux

// import csv file to PostgreSQL Table
// https://www.postgresqltutorial.com/import-csv-file-into-posgresql-table/

// build Node.js, Express.js, PostgreSQL CRUD REST API
// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
// https://www.taniarascia.com/node-express-postgresql-heroku/

// show list of tables in current database
// \dt

// show list of roles
// \du

// show list of databases
// \l   or    \l+

// show schema of a table
// \d products

// open a database
// \c servicedb

// show all tables while in a database
// \d

// drop database not working -- db is being access by other users
// first, revoke
  // REVOKE CONNECT ON DATABASE TARGET_DB FROM public;
// second
  // SELECT pg_terminate_backend(pg_stat_activity.pid)
  // FROM pg_stat_activity
  // WHERE pg_stat_activity.datname = 'TARGET_DB';