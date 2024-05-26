// setingan env
const path = require('path')
require('dotenv').config({ 
    path: path.join(__dirname, '../.env') 
});

const express = require('express');
const regisloginUsersRouter = require('./routes/regisloginUsers.js');

// settingan express
const app = express()
const port = process.env.PORT || 5000

// settingan express agar bisa mengambil data berbentuk json atau body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setingan ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// setingan folder static
app.use(express.static(path.join(__dirname, 'public')));





// Login Path
app.get('/login', (req, res) => {
    res.render('./login/login.ejs')
})
// Register Path
app.get('/register', (req, res) => {
    res.render('./login/register.ejs')
})



// Register And Login Users Path Routing
app.use('/', regisloginUsersRouter);





app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
})