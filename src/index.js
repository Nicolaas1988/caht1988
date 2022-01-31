const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getPlayerTurn,
  checkChar,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    io.to(user.room).emit(
      "generateNewPlayerSection",
      getUsersInRoom(user.room)
    );

    const playerT = getPlayerTurn();
    io.to(user.room).emit("playerTurn", playerT);

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("Admin", `${user.username} has joined!`)
      );

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("checkCharReq", (key, lastChar) => {
    let isCharAllowed = checkChar(key, lastChar, socket.id);
    io.to(socket.id).emit("checkCharRes", isCharAllowed);
  });

  socket.on(
    "updatePlayerArenaReq",
    (wordValue, wordPosition, letterValue, letterPosition) => {
      let user = getUser(socket.id);
      socket
        .to(user.room)
        .emit(
          "updatePlayerArenaRes",
          wordValue,
          wordPosition,
          letterValue,
          letterPosition
        );
    }
  );

  socket.on("disconnect", () => {
    const room = getUser(socket.id).room;
    const user = removeUser(socket.id, room);

    if (user) {
      // io.to(user.room).emit(
      //   "message",
      //   generateMessage("Admin", `${user.username} has left!`)
      // );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      io.to(user.room).emit(
        "generateNewPlayerSection",
        getUsersInRoom(user.room)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
