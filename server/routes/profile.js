const express = require('express');
const path = require('path');
const profile = express.Router();

const userModelController = require('../controller/userModelController');
const cookieController = require('../controller/cookieController');

profile.get('/profile.css', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../../profile.css'))
});

profile.post('/', userModelController.findUser, cookieController.setCookie, (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../client/profile.html"));
})

profile.put('/update', userModelController.updateUser, (req, res) => {
    res.status(200).json({gamesPlayed: res.locals.games_played,
                          correctAnswers: res.locals.correct_answers});
})

profile.delete('/delete', userModelController.deleteUser, (req, res) => {
    res.status(200).send('User has been deleted');
})

module.exports = profile;
