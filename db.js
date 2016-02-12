// get mysql
var mysql = require('mysql');


/**
 *  for PhpStorm auto complete
 * @type {{query: DB.query}}
 */
var DB = {
    query: function (a, e) {
    },
    escape: function(a){
    }
};

// set connection data
DB = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'drive2chat'
});

// connect to DB
DB.connect();

module.exports = DB;