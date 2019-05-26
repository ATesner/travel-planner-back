//https://www.codementor.io/julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2
const express = require('express')
const app = express()

const mysql = require('mysql')
// const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const morgan = require('morgan')

const port = 3008
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// for Post request API
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
// Log requests to console
app.use(morgan('dev'))

// MYSQL
const db_config = require('./app/config/db.config.js');
const db = mysql.createConnection (db_config);

db.connect((err) => {
    if (err) 
        throw err;
    console.log('Connected to mysql');
});
global.db = db;

require('./app/router/router.js')(app, express);

app.listen(port, () =>{
    console.log('Server is running on port ' + port)
});