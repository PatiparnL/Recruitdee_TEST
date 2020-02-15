const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// define a simple route
app.get('/', (req, res) =>
{
    res.json({ "message": "Welcome to " + process.env.NODE_ENV + " (" + process.env.name + ") application." });
});

require('./app/api/v1.0/routes/cpc.routes')(app);

global.__basedir = __dirname;
// listen for requests
module.exports = app;