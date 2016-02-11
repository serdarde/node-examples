var express = require('express');

var router = express.Router();

router.get("/", function (req, res) {
    res.send('<form action="/posts/add-message" method="post"><input type="text" name="new_one"></form>');
});

module.exports = router;