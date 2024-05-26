// setingan env
const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../../.env') 
});

// require mysql2
const mysql = require('mysql2');

// buat koneksi, nilai di ambil melalui file .env
const dbPool = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
})

// export menggunakan promise
module.exports = dbPool.promise();