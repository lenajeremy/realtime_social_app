const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const io = socketio(http.createServer(app));

let port = process.env.PORT || 2000;

io.on('connection', socket => {
  console.log('there is a fkal;s');
  console.log(socket);
})
app.listen(port, () => console.log(`Server has been started on port ${port}`))
