var http       = require('http');
var static     = require('node-static');
var fileServer = new static.Server('./public');
var server     = http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
});
var io         = require('socket.io')(server);

server.listen(process.env.PORT || 3000);


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





