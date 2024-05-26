// require dari folder config
const dbPool = require("../config/database.js");

// Membuat fungsi untuk query menambahkan ke database
const createUsersQuery = (body) => {

  const { username, email, password } = body;

  if (!username || !email || !password) {
    throw new Error("Semua Harus Diisi")
  }

  const sqlQuery = `INSERT INTO users (username, email, password) 
            VALUES (?, ?, ?)`;
  return dbPool.execute(sqlQuery, [username, email, password]);
};

const getUsersQuery = () => {
  const sqlQuery = `SELECT * FROM users`;
  return dbPool.execute(sqlQuery);
};

const getUsersLoginQuery = (email) => {
  const sqlQuery = `SELECT * FROM users WHERE email = '${email}'`;
  return dbPool.execute(sqlQuery);
};

// Fungsi untuk memeriksa apakah email sudah ada
const isEmailDuplicate = async (email) => {

  if (!email) {
    throw new Error("Email Tidak Boleh Kosong")
  }

  const sqlQuery = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;
  const [rows, fields] = await dbPool.execute(sqlQuery, [email]);
  const count = rows[0].count;

  return count > 0; // Jika count lebih dari 0, maka email sudah ada
};

module.exports = {
  createUsersQuery,
  getUsersQuery,
  getUsersLoginQuery,
  isEmailDuplicate,
};
