/**
 * Created by vhn on 12/02/2017.
 */

// Server modules
var express     = require('express');
var mongoose    = require('mongoose');
var morgan      = require('morgan');
var path        = require('path');
var bodyParser  = require('body-parser');

var config      = require('./config');

var app = express();

// Body-parser to grab POST resquests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// App to handle CORS requests
app.use( function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    next();
});

// System logget
app.use(morgan('dev'));

// DBconnection
mongoose.connect(config.database);

// FRONTEND
/* NOT REQUIRED FOR API BACKEND */

app.use( function (req, res, next) {
   console.log( ' API Accessed');
   next();
});

// API Routes
var mainAPIRoutes = require('./api/main')(app, express);
app.use('/', mainAPIRoutes);

/* SERVER Start details */
app.listen(config.port);
console.log('App has started on port: '+ config.port);