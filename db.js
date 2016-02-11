// get mysql
var mysql = require('mysql');

// set connection data
var DB = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});

// connect to DB
DB.connect();

module.exports = DB;