pa = function ($var) {
    console.log($var);
};

var express = require('express');
var app = express();

app.set('port',  process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.type('text/plain');
    res.send("Burasi Index");
});

app.use(function (err, req, res, next) {
    pa(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Not Found');
});

exports.start = function () {
    app.listen(app.get('port'), function () {
        console.log('Express ready on localhost/' + app.get('port'));
    });
};