var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

server.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

var nicks = {};

io.on('connection', function(socket){

    socket.on('join', function(name){
        if (!nicks[name]){
            nicks[name] = socket;
            socket.nickname = name;
            socket.broadcast.emit('newplayer', name);
        } else {
            socket.nickname = name;
            socket.broadcast.emit('reconnect', name);
        }
    });

    socket.on('key', function(name){
        socket.broadcast.emit('key', socket.nickname, name);
    });
});





