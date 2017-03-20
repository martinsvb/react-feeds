var express = require('express');
var app = express();
var path = require('path');

var __projectRoot = __dirname;
var server_port = process.env.PORT || 3000;

app.use(express.static(__projectRoot));

app.get('/', function (req, res) {
    res.sendFile('/build/index.html');
});

app.listen(server_port);