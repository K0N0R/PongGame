var app = require("express")();
var server = require('http').createServer(app);
var serveStatic = require('serve-static');
var io = require('socket.io')(server);

var serve = serveStatic(__dirname + "/static/pong/", { 'index': ['index.html', 'index.htm'] });

app.use(serve);

var userList = [];
io.on('connect', function (socket) {
    userList.push(socket);
    var tmpArray = [];
    for (var i = 0; i < userList.length; i++) {
        tmpArray.push({ id: userList[i].id, nick: "penis" })
    }
    socket.emit('PlayerJoin', tmpArray);
    socket.broadcast.emit('PlayerJoin', [{id:socket.id,nick:"penis"}]);

    socket.on('disconnect', function () {
        console.log(socket);
        io.emit('PlayerLeave', socket.id);
        for (var i = 0; i < userList.length; i++) {
            userList.splice(i, 1);
        }
    })
    socket.on("UserSelectBoard", function (data) {
        socket.broadcast.emit * ('UserBecomePlayer', data);
    })


});
server.listen(2137);