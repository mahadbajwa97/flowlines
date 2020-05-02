const appInsights = require("applicationinsights");
appInsights.setup("59b432da-e306-4be4-a09a-1d1e496ea97c");
appInsights.start();
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
app.set('view engine', 'html');
port = process.env.PORT || 3000;

app.use(express.static('Landing/images/'));
app.use(express.static('Landing/css'));
app.use(express.static('Landing/js/'));
app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./Routes'); //importing route
routes(app); //register the route
