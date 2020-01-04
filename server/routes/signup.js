const express = require ('express');
const userdataController = require('../controller/userdataController');
const signup = express.Router();

signup.get('/', (req, res) => {
    res.status(200);
});

module.exports = signup;