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
  updatePlayerTurn,
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

      // user.id
    );

    io.to(user.room).emit("disablePlayers");

    const playerTurn = getPlayerTurn(user);

    io.to(playerTurn).emit("enablePlayer", playerTurn);

    // io.to(socket.id).emit("enablePlayerIfTurn", getPlayerTurn(), socket.id);

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

    socket.on("checkCharReq", (previousWord, currentWord, diff, wordId) => {
      const user = getUser(socket.id);
      const lettersToUpdate = getUser(socket.id).letters;
      let charChecked = checkChar(
        previousWord,
        currentWord,
        diff,
        lettersToUpdate
      );
      io.to(user.room).emit(
        "checkCharRes",
        charChecked,
        socket.id,
        previousWord,
        currentWord,
        wordId
      );
    });

    socket.on("nextPlayer", () => {
      const user = getUser(socket.id);
      let playerTurn = updatePlayerTurn(user);
      io.to(user.room).emit("nextPlayerRes", playerTurn);

      ///
      io.to(user.room).emit("disablePlayers");
      io.to(playerTurn).emit("enablePlayer", playerTurn);

      ///
    });

    callback();
  });

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
