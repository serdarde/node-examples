pa = function ($var) {console.log($var)}
var express = require('express');
var bodyParser = require('body-parser');

// import routes
var index = require('../routes/index');
var posts = require('../routes/posts');

var app = express();

app.set('port',  process.env.PORT || 3000);

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Routes
app.use("/", index);
app.use("/posts", posts);

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function (err, req, res, next) {
    pa(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Internal Server Error');
});

exports.start = function () {
    app.listen(app.get('port'), function () {
        console.log('Express ready on localhost/' + app.get('port'));
    });
};