const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'nutanix/4u',
    database: 'inventoryManagement'
});

// const sql = require('mssql');
// const config = {
//     user: 'administrator',
//     password: 'nutanix/4u',
//     server: '10.42.101.54',
//     database: 'Fiesta-DB',
//     port: 1433
// }

// const connection = sql.connect(config);

module.exports = connection;

