const users = [];
const playerTurns = {
  room: {},
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

const getPlayerTurn = () => {
  return playerTurns;
};

const removeUser = (id, userRoom) => {
  const playerTurnIndex = playerTurns.room[`${userRoom}`].players.indexOf(id);

  if (playerTurnIndex !== -1) {
    playerTurns.room[`${userRoom}`].players.splice(playerTurnIndex, 1);
  }

  //Reinitialize room to default if all users left

  if (playerTurns.room[`${userRoom}`].players.length === 0) {
    delete playerTurns.room[`${userRoom}`];
  }

  //

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

module.exports = {
  addUser,
  removeUser,
  getUser,
  getPlayerTurn,
  getUsersInRoom,
};
