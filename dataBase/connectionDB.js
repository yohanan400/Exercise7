const mysql = require('mysql2');
 
const pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'fs7db',
    debug    :  false
}).promise();

module.exports = {pool};