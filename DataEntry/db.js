const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '10.2.0.4',
  user: 'root',
  password:'123456',
  database:'todoDB',
  port:'3304'
})
module.exports = connection;