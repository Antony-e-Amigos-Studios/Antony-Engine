const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
let PORT = 3000

app.use(express.static(__dirname + "/public/"))

server.listen(PORT, () => {
    console.clear()
    console.log(`Servidor inciado em http://localhost:${PORT}`)
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