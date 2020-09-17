const express = require('express');
const socketio = require('socket.io');
const path = require('path');


const app = express();
const server = require('http').createServer(app)
const io = socketio(server);

let port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  socket.emit('message', 'Hello')
  socket.broadcast.emit('message', "There is a new client");
  socket.on('msgFromFront', message => {
    io.emit('message', message)
  })
  socket.on('disconnect', stuff => {
    socket.broadcast.emit('message', 'someone has left the group');
  })
})
server.listen(port, () => console.log(`Server has been started on port ${port}`))
