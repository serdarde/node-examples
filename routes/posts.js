var express = require('express'),
    router = express.Router(),
    postsController = require('../controllers/PostsController');

router.get("/", function (req, res) {
    var callBack = function (messages) {
        res.json({'messages': messages})
    };
    postsController.getPosts(callBack)
});


router.post('/add-message', function(req, res){
    var newMessage = req.body.new_one;
    postsController.saveNewPost(newMessage, function () {
        res.redirect('/');
    });
});

module.exports = router;