const users = [];
const playerTurns = {
  room: {},
};

const fullUsers = () => {
  return users;
};

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  const user = {
    id,
    username,
    room,
    test: "test",
    letters: [
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
      "_",
    ],
  };

  const alphabet = "aaabcdeeefghiiijklmnooopqrstuuuvwxyz";

  for (i = 0; i < user.letters.length; i++) {
    let index = Math.floor(Math.random() * 36);
    let letter = alphabet.charAt(index);

    user.letters[i] = letter;
  }

  users.push(user);

  //Init playerturn on first round

  if (!playerTurns.room.hasOwnProperty(`${user.room}`)) {
    playerTurns.room[`${user.room}`] = {
      players: [id],
      turn: id,
    };
  } else {
    let newPlayerArray = [...playerTurns.room[`${user.room}`].players, id];
    playerTurns.room[`${user.room}`].players = newPlayerArray;
  }

  return { user };
};

const getPlayerTurn = (user) => {
  return playerTurns.room[`${user.room}`].turn;
};

const updatePlayerTurn = (user) => {
  let room = playerTurns.room[`${user.room}`];
  let index = room.players.indexOf(user.id) + 1;

  if (index <= room.players.length - 1) {
    room.turn = room.players[index];
  } else {
    room.turn = room.players[0];
  }
  return room.turn;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

const checkChar = (previousWord, currentWord, diff, letters) => {
  if (diff == "") {
    let letterToRestore = previousWord.charAt(previousWord.length - 1);
    let index = letters.indexOf("_");
    letters[index] = letterToRestore;

    return ["Backspace", index, letterToRestore];
  }

  if (letters.includes(diff) === false && diff !== "") {
    return false;
  }

  if (letters.includes(diff) === true) {
    let index = letters.indexOf(diff);
    letters[index] = "_";
    return [true, index, diff];
  }
};

module.exports = {
  addUser,
  removeUser,
  fullUsers,
  getUser,
  getPlayerTurn,
  updatePlayerTurn,
  getUsersInRoom,
  checkChar,
};
