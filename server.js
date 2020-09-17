// Express and Socket io importation
const express = require('express');
const socketio = require('socket.io');
const path = require('path');


// The main app
const app = express();

const server = require('http').createServer(app)
const io = socketio(server);//instance of socket io 


let port = process.env.PORT || 8000;

// Static middleware
app.use(express.static(path.join(__dirname, 'public')));

// on connection to the web socket

io.on('connection', socket => {
  //anytime there's is a new connection, a socket object
  // is created for each class with a couple of useful methods

  socket.emit('message', {sender: 'admin', content:'Hello'}) //Welcome message to new comers in the group

  socket.broadcast.emit('message', {sender: 'admin', content: "There is a new client"}) //message to existing clients when a new client joins;
  
  socket.on('msgFromFront', message => {
    io.emit('message', message)
  })

  socket.on('typing', stuff => {
    socket.broadcast.emit('showtyping', stuff)
  })

  socket.on('disconnect', stuff => {
    socket.broadcast.emit('message', {sender: 'admin', content: 'someone has left the group'});
  })
})
server.listen(port, () => console.log(`Server has been started on port ${port}`))
