const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

// Setup server & bypass CORS biar React bisa masuk
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*" // port 
  }
});

io.on('connection', (socket) => {
  console.log('Ada user baru yang konek dengan ID:', socket.id);

  // 1. Fitur masuk Room
  socket.on("join:room", (data) => {
    socket.join(data.room); // Memasukkan user ke kamar spesifik
    console.log(`User ${data.username} masuk ke Room: ${data.room}`);
  });

  // 2. Fitur ngirim Chat di Room tersebut
  socket.on("message:new", (data) => {
   
    io.to(data.room).emit("message:update", {
      from: data.username,
      message: data.message
    });
  });

  socket.on('disconnect', () => {
    console.log('User leave:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server Chat Room nyala di port ${PORT}`);
});