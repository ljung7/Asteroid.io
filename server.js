const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 80;

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.redirect("/index.html");
});

io.on('connection', (socket) => {
  socket.on('playerstate', (state) => {
    socket.broadcast.emit('gamestate', state);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});