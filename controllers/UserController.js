var DB = require('../db');

var UserController = {
    login: function (callback) {
        DB.query("SELECT * FROM user", function (err, messages) {
            if (err) throw err;

            callback(messages);
        });
    },
    saveNewPost: function (newPost, callback) {
        DB.query('INSERT INTO posts SET ?', {comment: newPost}, function (err, result) {
            if (err) throw err;

            console.log(result.insertId);

            callback();
        });
    }
};

module.exports = UserController;