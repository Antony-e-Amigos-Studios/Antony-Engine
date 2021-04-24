const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname + '/public/')); //eae

server.listen(3000, () => {
    console.log('Servidor inciado em localhost:3000');
});

////////////////////////////////////////////////////////////////
let players = {};

io.on('connection', socket => {
    socket.on('PlayerEnter', data => {
        players[data.id] = data;
        io.emit('PlayerAdd', players);
    });

    socket.on('PlayerData', data => {
        players[data.id] = data;
        io.emit('PlayerUpdate', players);
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('PlayerUpdate', players);
    })

});