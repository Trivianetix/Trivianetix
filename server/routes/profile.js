const express = require('express');
const path = require('path');
const profile = express.Router();

const userModelController = require('../controller/userModelController');

profile.post('/', userModelController.findUser, (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../client/profile.html"));
})

profile.post('/update', userModelController.updateUser, (req, res) => {
    res.status(200).send('profile successfully updated!');
})

module.exports = profile;
