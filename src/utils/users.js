const users = [];

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

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  user.letters.forEach((l) => {
    let index = Math.floor(Math.random() * 25);
    let letter = alphabet.charAt(index);

    l = letter;
  });

  users.push(user);
  return { user };
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

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
