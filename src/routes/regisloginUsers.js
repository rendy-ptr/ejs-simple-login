// Import express dan controller
const express = require('express');
const { registerUser, loginUser } = require('../controllers/users.js');

// Buat router
const router = express.Router();

// Definisikan route register dengan fungsi yang sesuai di controller
router.post('/register', registerUser);

// Definisikan route login dengan fungsi yang sesuai di controller
router.post('/login', loginUser);

// Export router
module.exports = router;