const db = require('../data/userModel');
const fs = require('fs');
const fetch = require("node-fetch");

const userModelController = {};

//action whenever a new user signs up
userModelController.createUser = (req, res, next) => {
    const { username, password, age, state, education } = req.body;
    console.log('req.body: ', req.body);
    const text = `
            INSERT INTO users (username, password, age, state, education, games_played, correct_answers)
            values($1, $2, $3, $4, $5, $6, $7)
        `
    const values = [username, password, age, state, education, 0, 0];

    db.query(text, values)
        .then(response => console.log(response))
        .catch(err => console.log(err))

    next();
}

//used for login verification
userModelController.findUser = (req, res, next) => {
    const { username, password } = req.body;
    console.log('req.body: ', req.body);
    const text = `
            SELECT username
            FROM users
            WHERE username = '${username}' AND password = '${password}'

    `
    // const values = [username, password];
    db.query(text)
        .then(response => {
            //if the user doesn't exist or username/password is incorrect
            if (response.rows[0]) {
                console.log('User ', response.rows[0].username, ' has been verified through SQL DB');
                next();
            } else {
                console.log('Username or password is invalid.');
                res.send('Invalid username or password. Please sign up or try again.');
            }
        })
        .catch(err => console.log(err))

}

// used to find games played and correct answers
userModelController.findStats = (req, res, next) => {
    const text = `
        SELECT games_played, correct_answers
        FROM users
        WHERE username = '${req.params.username}'
    `
    db.query(text)
        .then(response => {
            if (response.rows[0]) {
                console.log('User ', req.params.username, ' Games played: ', response.rows[0].games_played, ' Correct answers: ', response.rows[0].correct_answers);
                res.locals.stats = response.rows[0];
                next();
            } else {
                console.log('Error occurred. Username is not sending properly.');
                res.send('Error occurred. Username is not sending properly.');
            }
        })
        .catch(err => console.log(err))
}

userModelController.questions = async (req, res, next) => {
    console.log(req.params.url)
    const url = 'https://opentdb.com/api.php?amount=10&category=' + req.params.url + '&type=multiple';
    // const url = req.params.url;
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            res.locals.results = data.results;
        })
        .catch(err => console.log(err));
    next();
}

// used for when a user wants to update their information -- stretch feature?
userModelController.updateUser = async (req, res, next) => {
    const { username, correctAnswers } = req.body;
    const text1 = `
        SELECT games_played, correct_answers
        FROM users
        WHERE username = '${username}'
    `

    await db.query(text1)
        .then(response => res.locals.updatedStats = response.rows[0])
        .catch(err => console.log(err))

    res.locals.games_played = res.locals.updatedStats.games_played + 1;
    res.locals.correct_answers = res.locals.updatedStats.correct_answers + correctAnswers;

    const text2 = `
        UPDATE users
        SET games_played = '${res.locals.games_played}', correct_answers = '${res.locals.correct_answers}'
        WHERE username = '${username}'
    `
    // const values = [username, password, age];

    await db.query(text2)
        .then(response => console.log(response))
        .catch(err => console.log(err))

    next();
}

userModelController.deleteUser = async (req, res, next) => {
    const { username } = req.body;
    const text = `
        DELETE FROM users
        WHERE username = '${username}'
    `
    await db.query(text)
        .then(response => console.log(`${username} has been deleted`))
        .catch(err => console.log(err))
    next();
}

module.exports = userModelController;
