var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config.json');

app.use(express.static(__dirname + '/../client'));


io.on('connection', function(socket) {
    socket.emit('id', socket.id);
    socket.on('disconnect', function() {
        io.emit('remove_pl', socket.id);
    });
    socket.on('init', function(pl) {
        if (JSON.parse(pl).id != "") {
            io.emit('init', pl);
        }
    });
    socket.on('update', function(pl) {
        if (JSON.parse(pl).id != "") {
            io.emit('update', pl);
        }
    });
});

var serverPort = process.env.PORT || config.port;
http.listen(serverPort, function() {
    console.log("Server is listening on port " + serverPort);
});