const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'nutanix/4u',
    database: 'inventoryManagement'
});

// const sql = require('mssql');
// // config for your database
// var config = {
//     user: 'administrator',
//     password: 'nutanix/4u',
//     server: '10.42.101.54\\Fiesta-DB', 
//     database: 'Fiesta-DB' 
// };

// // connect to your database
// sql.connect(config, function (err) {

//     if (err) console.log(err);

//     // create Request object
//     var request = new sql.Request();
       
//     // query to the database and get the records
//     request.query('select * from Student', function (err, recordset) {
        
//         if (err) console.log(err)

//         // send records as a response
//         res.send(recordset);
        
//     });
// });






// const dbConfig = {
//     server: '10.42.101.54\\Fiesta-DB',
//     database: 'Fiesta-DB',
//     user: 'administrator',
//     password: 'nutanix/4u',
//     port: 1433
// }

// function getData() {
//     let conn = new sql.Connection(dbConfig);
//     let req = new sql.Request(conn);

//     conn.connect(function (err) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         req.query("Select * from stores", function (err, recordset) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(recordset);
//             }
//             conn.close();
//         });
//     });
// }


module.exports = connection;

// sqlcmd -S 127.0.0.1 -U sa -P your_password -Q "SELECT @@VERSION"