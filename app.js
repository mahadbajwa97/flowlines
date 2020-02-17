const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
app.set('view engine', 'html');
port = process.env.PORT || 3000;

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./Routes'); //importing route
routes(app); //register the route
