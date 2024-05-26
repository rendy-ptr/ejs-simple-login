// require dari folder models
const {
  createUsersQuery,
  getUsersLoginQuery,
  getUsersQuery,
  isEmailDuplicate,
} = require("../models/users.js");

// const { showSuccessAlert, showErrorAlert } = require("../public/js/sweetalert.js")


const registerUser = async (req, res) => {
  // tangkap body yang dikirimkan dari form
  const { username, email, password } = req.body;

  console.log(req.body)

  
  try {
    // validasi input
    if (!username ||!email ||!password) {
      throw new Error("Username, Email, dan Password harus diisi.");
    }
    // Cek apakah email sudah ada
    const isDuplicate = await isEmailDuplicate(email);

    if (isDuplicate) {
      throw new Error("Email sudah digunakan.");
    }
    // eksekusi query dari folder models, paramater body karena di models dibutuhkan
    await createUsersQuery({username, email, password});
    // Kirim Response Berbentuk JSON, nanti edit mungkin menggunakan vanilla alert lalu di return ke halaman login
    res.status(201).send({
      message: "Register Success",
      // data: body,
    });
    // untuk menangkap error nya jika ada
  } catch (error) {
    console.error("Internal Server Error:", error);

    res.status(400).send({
      status: "Error",
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [data] = await getUsersLoginQuery(email);

    // Jika data user tidak ditemukan
    if (data.length == 0) {
      return res.status(401).json({
        status: "error-email",
        message: "Invalid email",
      });
    }

    //console.log(data); // masih berbentuk array di dalam nya terdapat objek

    // jika data user ditemukan, ambil array of objek indeks ke 0 atau pertama, untuk menghilangkan array jadi 
    //sisanya hanya output berbentuk object
    const user = data[0];

    //console.log(user); // array nya hilang, sisa objek di dalam nya

    // Validasi password
    if (user.password !== password) {
      return res.status(401).json({
        status: "error-password",
        message: "Invalid password",
      });
    }

    // Jika email dan password valid
    res.json({
      status: "login-success",
      message: "Login Success",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: error
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
