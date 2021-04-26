const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static(__dirname + "/public/"))

server.listen(3000, () => {
    console.log('Servidor inciado em http://localhost:3000')
})

/////////////////////////////////////////////////////////////
let players = {}

io.on('connection', socket => {
    console.log('Cliente conectado!')

    socket.on('NewPlayer', data => {
        players[socket.id] = (data)
        io.emit('UpdatePlayers', players)
    })

    socket.on('UpdatePlayer', (id, data) => {
        players[id] = data
        io.emit('UpdatePlayers', players)
    })

    socket.on('disconnect', ()=> {
        delete players[socket.id]
        io.emit('UpdatePlayers', players)
    })
})