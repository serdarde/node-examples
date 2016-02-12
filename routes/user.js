var express = require('express'),
    router = express.Router(),
    userController = require('../controllers/UserController'),
    authController = require('../controllers/AuthController');

router.get("/login", function (req, res) {
    // check permission
    authController.checkPermission(req, res, 'login', function () {

        // do processes if user has permission
        userController.login(function (messages) {
            res.json({'messages': messages})
        })
    });
});


router.post('/add-message', function(req, res){
    var newMessage = req.body.new_one;
    userController.saveNewPost(newMessage, function () {
        res.redirect('/');
    });
});

module.exports = router;