const db = require('../data/userModel');

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
    const values = [username, password];
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

// used for when a user wants to update their information -- stretch feature?
userModelController.updateUser = (req, res, next) => {
    const { username, password, age } = req.body;
    const text = `
        UPDATE users
        SET username = ${username}
        SET password = ${password}
        SET age = ${age}
        WHERE username = ${username}
    `
    const values = [username, password, age];

    db.query(text, values)
        .then(response => console.log(response))
        .catch(err => console.log(err))

    next();
}
module.exports = userModelController;
