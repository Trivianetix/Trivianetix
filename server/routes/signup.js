const express = require ('express');
const userModelController = require('../controller/userModelController');
const signup = express.Router();

signup.get('/', (req, res) => {
    res.status(200);
});

module.exports = signup;