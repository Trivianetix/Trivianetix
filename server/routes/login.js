const express = require('express');
const login = express.Router();
const path = require('path');

//importing actions from controller
const userModelController = require('../controller/userModelController');

login.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../../index.html'))
})


module.exports = login;