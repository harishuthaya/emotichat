const dotenv = require('dotenv');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const https = require('https');
const cors = require('cors');
const mongoose = require('mongoose');
const Room = require('./dbRoom');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { getEmotion } = require('./emotion');
const router = require('./router');
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';
const PORT = process.env.PORT || 4000;
const MONGO = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/emotichat';
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ORIGIN,
    methods: ['GET', 'POST'],
  },
});

mongoose.connect(
  MONGO,
  () => {
    console.log('Connected to MongoDB');
  },
  (e) => console.error(e)
);

app.use(router);

io.on('connection', (socket) => {
  console.log('A user has connected.');

  socket.on('join', async ({ name, room }, callback) => {
    console.log(name, room);
    const { user } = addUser({ id: socket.id, name, room });

    socket.join(user.room);

    const message = `${user.name} has joined Room ${user.room}.`;

    io.to(user.room).emit('message', {
      user: 'Admin',
      text: message,
      emotion: 'joy',
      id: 0,
    });

    const dbRoom = await Room.findOne({ room: `${user.room}` });
    if (dbRoom) {
      await Room.updateOne(
        { room: user.room },
        {
          messages: [
            ...dbRoom.messages,
            { user: 'Admin', text: message, emotion: 'joy', id: 0 },
          ],
        }
      );
      const dbUpdated = await Room.findOne({ room: `${user.room}` });
      console.log(dbUpdated);
    } else {
      const newRoom = new Room({
        room,
        messages: [{ user: 'Admin', text: message, emotion: 'joy', id: 0 }],
      });
      await newRoom.save();
      console.log(newRoom);
    }

    callback(user.id, dbRoom);
  });

  socket.on('sendMessage', async (message, callback) => {
    const user = getUser(socket.id);

    const emotion = await getEmotion(message);

    io.to(user.room).emit('message', {
      user: user.name,
      text: message,
      emotion: `${emotion}`,
      id: user.id,
    });

    const dbCurrent = await Room.findOne({ room: user.room });
    if (dbCurrent) {
      await Room.updateOne(
        { room: user.room },
        {
          messages: [
            ...dbCurrent.messages,
            { user: user.name, text: message, emotion, id: user.id },
          ],
        }
      );
    }

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    // add admin disconnect message.
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
