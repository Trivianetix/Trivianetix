const db = require('../data/userModel');

const cookieController = {}

cookieController.setCookie = (req, res, next) => {
    const { username } = req.body;
    res.cookie('username', username, {httpOnly: true});
    next();
}

module.exports = cookieController;