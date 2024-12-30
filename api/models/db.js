const mysql = require('mysql');
const dbConfig = require('../config/db.config');

//Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.mysql.host,
    user: dbConfig.mysql.username,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database
});

//open the MySQL connection
connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;